import React from 'react';
import { useSelector } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { NotFound } from '../pages/NotFound';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <HashRouter>
      <Routes>
        <Route path="/signin" element={auth ? <Navigate replace to="/" /> : <SignIn />} />
        <Route path="/signup" element={auth ? <Navigate replace to="/" /> : <SignUp />} />
        <Route path="/" element={<Home />} />
        <Route element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
