import React from 'react';
import { useCookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate, Link } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import './header.scss';

export const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    removeCookie('token');
    removeCookie('name');
    removeCookie('iconUrl');
    navigate('/signin');
  };

  return (
    <header className="header">
      <h1>Review Books</h1>
      {cookies.token ? (
        <>
          <img src={cookies.iconUrl} alt="" />
          <strong>{cookies.name}</strong>
          <Link className="header__edit-user" to="/profile">
            ユーザー情報編集
          </Link>
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
