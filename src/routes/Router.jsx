import React from 'react';
import { useSelector } from 'react-redux'; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { NotFound } from '../pages/NotFound';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? <Route path="/" element={<Home />} /> : <Route path="*" element={<Navigate to="/signin" />} />}
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
