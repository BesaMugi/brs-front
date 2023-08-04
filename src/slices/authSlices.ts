import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: null,
  token: localStorage.getItem("token"),
  signIn: false,
  showBar: true,
};

export const authSignIn = createAsyncThunk(
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

      localStorage.setItem("token", token.token);
      return token;
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      throw error;
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
      .addCase(authSignIn.pending, (state, action) => {
        console.log(action);
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
        }
      })
      .addCase(authSignIn.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const { showBarToggle } = authSlices.actions;
export default authSlices.reducer;
