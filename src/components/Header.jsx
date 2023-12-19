import React from 'react';
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate, Link } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
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
    removeCookie('name');
    removeCookie('iconUrl');
    navigate('/signin');
  };

  return (
    <header className="header">
      <h1>Review Books</h1>
      {auth ? (
        <>
          <img src={cookies.iconUrl} alt="" />
          <strong>{cookies.name}</strong>
          <button type="button" onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </button>
        </>
      ) : (
        <Link to="/signin">
          <button type="button" className="sign-in-button">
            サインイン
          </button>
        </Link>
      )}
    </header>
  );
};
