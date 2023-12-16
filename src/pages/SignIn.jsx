import React, { useState } from 'react';
import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { Navigate, useNavigate, Link } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
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
        <form className="signin-form">
          <label className="email-label" htmlFor="email">
            email
            <input type="email" id="email" onChange={handleEmailChange} />
          </label>
          <label htmlFor="password">
            password
            <input type="password" id="password" onChange={handlePasswordChange} />
          </label>
          <button type="button" className="signin-button" onClick={onSignIn}>
            Sign In
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
