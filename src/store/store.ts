import { configureStore } from "@reduxjs/toolkit";
import lessons from "../reducer/lessonSlice"
import groups from "../reducer/groupSlice"

export const store = configureStore({
  reducer: {
    lessons,
    groups,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;