import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { NotFound } from '../pages/NotFound';

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
