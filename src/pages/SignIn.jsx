import React, { useState } from 'react';
import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { Navigate, useNavigate, Link } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form'; // eslint-disable-line import/no-extraneous-dependencies
import { signIn } from '../authSlice';
import { url } from '../const';
import { Header } from '../components/Header';

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email, password })
      .then((res) => {
        setCookie('token', res.data.token);
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <main className="signin">
        <Header />
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        {/* eslint-disable */}
        <form className="signin-form" onSubmit={handleSubmit(onSignIn)}>
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
          {errors.email && <p className="validation-err-email">{errors.email.message}</p>}
          {errors.password && <p className="validation-err-password">{errors.password.message}</p>}
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        {/* eslint-enable */}
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
