import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface AuthState {
  error: string | null;
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
      });
  },
});

export const { showBarToggle } = authSlices.actions;
export default authSlices.reducer;
