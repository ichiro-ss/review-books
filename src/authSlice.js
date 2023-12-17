import { createSlice } from '@reduxjs/toolkit'; // eslint-disable-line import/no-extraneous-dependencies
import { Cookies } from 'react-cookie'; // eslint-disable-line import/no-extraneous-dependencies

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get('token') !== undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignIn: cookie.get('token') !== undefined,
  },
  reducers: {
    signIn: (state) => {
      const theState = state;
      theState.isSignIn = true;
    },
    signOut: (state) => {
      const theState = state;
      theState.isSignIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
