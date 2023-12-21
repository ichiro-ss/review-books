import React from 'react';
import { useCookies } from 'react-cookie';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

export const Router = () => {
  const [cookies] = useCookies();
  return (
    <HashRouter>
      <Routes>
        <Route path="/signin" element={cookies.token ? <Navigate replace to="/" /> : <SignIn />} />
        <Route path="/signup" element={cookies.token ? <Navigate replace to="/" /> : <SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
