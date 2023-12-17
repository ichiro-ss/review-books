import React from 'react';
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { signOut } from '../authSlice';
import './header.scss';

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <header className="header">
      <h1>Todoアプリ</h1>
      {auth ? (
        <>
          <img src={cookies.iconUrl} alt="" />
          <button type="button" onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </button>
        </>
      ) : (
        <> </>
      )}
    </header>
  );
};
