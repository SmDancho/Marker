import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useCookie } from '../../hooks/getToken';
import type { user } from '../../types';
import { instance } from '../../utils/axios';

interface userData {
  username: string;
  password: string;
}

export interface authState {
  user: user | null;
  viewUser: user | null;
  token: null | string;
  isLoading: boolean;
  status: null | string;
  allUsers: user[];
  isOpenConfirm: boolean;
}

const initialState: authState = {
  user: null,
  viewUser: null,
  token: null,
  isLoading: false,
  status: null,
  allUsers: [],
  isOpenConfirm: false,
};

export const googleAuth = createAsyncThunk(
  'authSlice/googleAuth',
  async (credential: any) => {
    const data = await instance
      .post('/auth/google', credential)
      .then((user) => {
        document.cookie =
          encodeURIComponent('token') +
          '=' +
          encodeURIComponent(user.data.token);
        return user.data;
      });

    return data;
  }
);

export const twitchAuth = createAsyncThunk(
  'authSlice/twitchAuth',
  async (userData: {
    client_id: string;
    expires_in: number;
    login: string;
    scopes: string[];
    user_id: string;
  }) => {
    const data = await instance.post('/auth/twitch', userData).then((user) => {
      document.cookie =
        encodeURIComponent('token') + '=' + encodeURIComponent(user.data.token);
      return user.data;
    });
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'authSlice/registerUser',
  async ({ username, password }: userData) => {
    const data = await instance
      .post('/auth/registration', {
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
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async ({ username, password }: userData) => {
    const data = await instance
      .post('/auth/login', {
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

export const getme = createAsyncThunk('authSlice/getme', async () => {
  const data = await instance
    .get('/auth/getme', {
      headers: {
        Authorization: `Bearer ${useCookie('token')}`,
      },
    })
    .then((response) => response.data);
  return data;
});

export const getUsers = createAsyncThunk('authSlice/getUsers', async () => {
  const data = await instance
    .get('/users/all')
    .then((response) => response.data);
  return data;
});
export const getUserByID = createAsyncThunk(
  'postSlice/getUserByID',
  async (id: string) => {
    const data = await instance
      .post('/users/getUserByid', { id })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const deleteUser = createAsyncThunk(
  'postSlice/deleteUser',
  async (id: string) => {
    const data = await instance
      .post('/users/delete', { id })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);
export const blockUser = createAsyncThunk(
  'postSlice/blockUser',
  async (id: string) => {
    const data = await instance
      .post('/users/block', { id })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const makeAdmin = createAsyncThunk(
  'postSlice/makeAdmin',
  async (id: string) => {
    const data = await instance
      .post('/users/admin', { id })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

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
    openConfirm: (state, action) => {
      state.isOpenConfirm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blockUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(blockUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(blockUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.viewUser = null;
    });
    builder.addCase(makeAdmin.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(makeAdmin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(makeAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.viewUser = null;
    });
    builder.addCase(twitchAuth.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(twitchAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(twitchAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(getUserByID.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserByID.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.viewUser = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });

    builder.addCase(googleAuth.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(googleAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(googleAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.data;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.message);
      state.token = action.payload.token;
      state.status = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(getme.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getme.pending, (state) => {
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
export const { logout, openConfirm } = authSlice.actions;

export default authSlice.reducer;
