import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type UserData = {
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  role: string;
  password: string;
  groups: string;
  lessons: string;
  journalPresent: [];
};

export type AllUsersData = {
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
  surName: string;
  role: string;
  password: string;
  groups: string;
  lessons: string;
};

export const userAll = createAsyncThunk<AllUsersData[], void>(
  "user/userAll",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      return users;
    } catch (error: any) {
      throw new Error(error.message || "Не удалось получить список пользователей");
    }
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (userId: string) => {
    try {
      await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
      });
      return userId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk<UserData, UserData>(
  "user/updateUser",
  async (updatedUser: UserData) => {
    try {
      const res = await fetch(`http://localhost:3000/user/${updatedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const user = await res.json() 
      return user
    } catch (error: any) {
      throw new Error(error.message || "Не удалось обновить данные пользователя");
    }
  }
)

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
        state.error =
          action.error.message || "Ошибка получения списка пользователей";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не удалось удалить пользователя";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedUser = action.payload;
        const updatedUserIndex = state.users.findIndex(user => user._id === updatedUser._id);
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не удалось обновить данные пользователя";
      })
  },
});

export default userSlice.reducer;
