import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
interface AuthState {
  error:  null;
  loading: boolean | null;
  token: string | null;
  signIn: boolean;
  showBar: boolean;
}

const initialState: AuthState = {
  error: null,
  loading: null,
  token: localStorage.getItem("token"),
  signIn: false,
  showBar: true,
};
interface SignInPayload {
  login: string;
  password: string;
}

export const authSignIn = createAsyncThunk<string, SignInPayload, {rejectValue:string}>(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }

      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      return thunkAPI.rejectWithValue('Ошибка аутенфикации')
    }
  }
);
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password, firstName, lastName, surName }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, firstName, lastName, surName }),
      });
      const json = await res.json();

      if (json.error || json.error[0].msg) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showBarToggle: (state) => {
      state.showBar = !state.showBar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.token = action.payload;
        }
      })
      .addCase(authSignIn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(authSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Ошибка при регистрации';
      
      })
  },
});

export const { showBarToggle } = authSlices.actions;
export default authSlices.reducer;
