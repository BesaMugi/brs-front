import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type UserData = {
  id: number;
  login: string;
  lastname: string;
  surname: string;
  group: string;
};

type AllUsersData = {
  id: number;
  login: string;
  lastname: string;
  surname: string;
  group: string;
};

export const userAll = createAsyncThunk<AllUsersData[], void>(
  "user/userAll",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      return users;
    } catch (error) {
      throw new Error(error.message || "Ошибка получения списка пользователей");
    }
  }
);

interface UserState {
    users: UserData[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
  };
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(userAll.pending, (state) => {
          state.loading = true;
        })
        .addCase(userAll.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.users = action.payload;
        })
        .addCase(userAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Ошибка получения списка пользователей";
        });
    },
  });

  export default userSlice.reducer