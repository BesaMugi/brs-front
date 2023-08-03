import { configureStore } from "@reduxjs/toolkit";
import lessons from "../reducer/lessonSlice"

export const store = configureStore({
  reducer: {
    lessons
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;