import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { useCookie } from '../../hooks/getToken';
import type { user } from '../../types';

export interface authState {
  user: user | null;
  token: null | string;
  isLoading: boolean;
  status: null | string;
}
interface userData {
  username: string;
  password: string;
}

const initialState: authState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'authSlice/registerUser',
  async ({ username, password }: userData) => {
    const data = await axios
      .post('http://localhost:5000/auth/registration', {
        username,
        password,
      })
      .then((user) => {
        document.cookie =
          encodeURIComponent('token') +
          '=' +
          encodeURIComponent(user.data.token);
        return user.data;
      });
    console.log(data);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async ({ username, password }: userData) => {
    const data = await axios
      .post('http://localhost:5000/auth/login', {
        username,
        password,
      })
      .then((response) => {
        document.cookie =
          encodeURIComponent('token') +
          '=' +
          encodeURIComponent(response.data.token);

        return response.data;
      });

    return data;
  }
);

export const getme = createAsyncThunk('authSlice/getme', async (state) => {
  const data = await axios
    .get('http://localhost:5000/auth/getme', {
      headers: {
        Authorization: `Bearer ${useCookie('token')}`,
      },
    })
    .then((response) => response.data);
  return data;
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      document.cookie = 'token =';
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.data;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
    // builder.addCase(registerUser.rejected, (state, action) => {
    //   state.status = action.payload.message;
    // });

    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.message);
      state.token = action.payload.token;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(getme.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getme.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
  },
});

export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;

export default authSlice.reducer;
