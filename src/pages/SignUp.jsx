import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate, Navigate, Link } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import Compressor from 'compressorjs'; // eslint-disable-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form'; // eslint-disable-line import/no-extraneous-dependencies
import { signIn } from '../authSlice';
import { url } from '../const';
import { Header } from '../components/Header';

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [iconPrev, setIconPrev] = useState(null);
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignUp = () => {
    const data = {
      name,
      email,
      password,
    };

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const { token } = res.data;
        dispatch(signIn());
        setCookie('token', token);
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
        return null;
      });

    if (iconFile) {
      new Compressor(iconFile, {
        quality: 0.6,
        success(result) {
          setIconFile(result);
        },
        error(err) {
          console.log(err);
        },
      });
    }
    const formData = new FormData();
    formData.append('icon', iconFile);
    axios
      .post(`${url}/uploads`, formData, {
        headers: { Authorization: `Bearer ${cookies.token}`, 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const { iconUrl } = res.data;
        setCookie('iconUrl', iconUrl);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });
    if (auth) return <Navigate to="/" />;

    return null;
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return null;
    }
    setIconFile(file);
    setIconPrev(window.URL.createObjectURL(file));

    return null;
  };

  return (
    <div>
      <main className="signup">
        <Header />
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={handleSubmit(onSignUp)}>
          {/* eslint-disable */}
          <label htmlFor="text">
            name
            <input
              {...register('name', {
                required: 'please input your name',
                maxLength: {
                  value: 30,
                  message: 'maxLength: 30',
                },
              })}
              type="text"
              onChange={handleNameChange}
              id="text"
            />
          </label>
          <label htmlFor="email">
            email
            <input
              {...register('email', {
                required: 'please input your email',
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: 'please check your email',
                },
              })}
              type="email"
              onChange={handleEmailChange}
              id="email"
            />
          </label>
          <label htmlFor="password">
            password
            <input
              {...register('password', {
                required: 'please input password',
                minLength: {
                  value: 2,
                  message: 'minLength: 2',
                },
              })}
              type="password"
              onChange={handlePasswordChange}
              id="password"
            />
          </label>
          {errors.name && <div>{errors.name.message}</div>}
          {errors.email && <div>{errors.email.message}</div>}
          {errors.password && <div>{errors.password.message}</div>}
          {/* eslint-enable */}
          <p>アイコンを設定</p>
          <input type="file" onChange={handleIconChange} id="file" accept="image/*" required />
          <button type="submit" className="signup-button">
            Create
          </button>
        </form>
        <img className="icon-preview" src={iconPrev} alt="" />
        <Link to="/signin">すでにアカウントをもっている</Link>
      </main>
    </div>
  );
};
