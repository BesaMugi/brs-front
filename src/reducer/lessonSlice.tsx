import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface LessonsState {
  error: string | null | unknown;
  loading: boolean;
  lessons: LessonsItem[];
}

export interface LessonsItem {
  _id: string;
  title: string;
}

const initialState: LessonsState = {
  error: null,
  loading: false,
  lessons: [],
};

export const fetchLessons = createAsyncThunk<
  LessonsItem[],
  void,
  { rejectValue: string | unknown }
>("fetch/lessons", async (_, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/lessons`);
    const lessons = await res.json();
    return lessons;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchLessons.fulfilled,(state, action: PayloadAction<LessonsItem[]>) => {
          state.lessons = action.payload;
          console.log(action.payload);
          
        }
      )
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lessonSlice.reducer;
