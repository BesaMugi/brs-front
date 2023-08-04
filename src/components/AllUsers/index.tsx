import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Определите тип данных, которые возвращает ваше асинхронное действие userInfo
type UserData = {
  id: number;
  name: string;
  // ... другие свойства пользователя ...
};

// Создайте асинхронное действие userInfo
export const userInfo = createAsyncThunk<UserData[], void, { state: RootState }>(
  "user/userInfo",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      throw new Error(error.message || "Ошибка получения данных пользователя");
    }
  }
);

// Определите тип данных, которые возвращает ваше асинхронное действие userAll
type AllUsersData = {
  id: number;
  name: string;
  // ... другие свойства пользователей ...
};

// Создайте асинхронное действие userAll
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

// Определите интерфейс состояния среза
interface UserState {
  users: UserData[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние среза
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
      .addCase(userInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения данных пользователя";
      })
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

export default userSlice.reducer;
