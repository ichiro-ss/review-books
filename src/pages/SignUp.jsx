import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate, Navigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { signIn } from '../authSlice';
import { url } from '../const';

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
    };

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const { token } = res.data;
        dispatch(signIn());
        setCookie('token', token);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });
    if (auth) return <Navigate to="/" />;

    return null;
  };

  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label htmlFor="email">
            email
            <input type="email" onChange={handleEmailChange} id="email" />
          </label>
          <label htmlFor="text">
            name
            <input type="text" onChange={handleNameChange} id="text" />
          </label>
          <label htmlFor="password">
            password
            <input type="password" onChange={handlePasswordChange} id="password" />
          </label>
          <button type="button" onClick={onSignUp} className="signup-button">
            Create
          </button>
        </form>
      </main>
    </div>
  );
};
