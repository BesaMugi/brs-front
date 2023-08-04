import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    });
    builder.addCase(userInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Ошибка получения данных пользователя";
    });

    builder.addCase(userAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userAll.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    });
    builder.addCase(userAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Ошибка получения списка пользователей";
    });
  },
});

export default userSlice.reducer;
