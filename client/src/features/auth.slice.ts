import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../interfaces/User";
import * as api from "../api";

interface AuthState {
  token: string | null;
  user: User | null;
  errors: any;
}


const initialState: AuthState = {
    token: null,
    user: null,
    errors: null
}

export interface signInInput {
    authentification_method: string;
    password: string;
}

// actions are processes that get data from backend
// TODO: change types
export const signIn = createAsyncThunk<signInInput, User[]>(
    'posts/signIn',
    async (data: any, thunkAPI) => {
      try {
        const response = await api.signIn(data);
        console.log(data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const signUp = createAsyncThunk<Object, User>(
    'posts/signUp',
    async (data, thunkAPI) => {
      try {
        const response = await api.signUp(data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


// reducers -> reduce to a specific state -> changes state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<User>) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      state.auth = action.payload;
    },
    register: (state, { payload }) => {},
    logout: (state: any) => {
      localStorage.clear();
      sessionStorage.clear();
      state.auth = null;
    }
  }
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
