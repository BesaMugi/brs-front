import { createAsyncThunk } from "@reduxjs/toolkit";

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
