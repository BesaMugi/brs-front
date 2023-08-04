import { configureStore } from "@reduxjs/toolkit";
import lessons from "../reducer/lessonSlice";
import groups from "../reducer/groupSlice";
import application from "../reducer/authSlices";

export const store = configureStore({
  reducer: {
    application,
    lessons,
    groups,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
