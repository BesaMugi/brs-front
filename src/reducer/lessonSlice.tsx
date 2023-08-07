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

export const addLessons = createAsyncThunk(
  "add/Lesson",
  async (lessonName, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: lessonName }),
      });

      const lessons = await res.json();
      return lessons;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteLessons = createAsyncThunk(
  "delete/Lesson",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3000/lesson/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeLessons = createAsyncThunk(
  "change/Lesson",
  async ({ lessonId, newLessonName }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/lesson/${lessonId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newLessonName }),
      });
      const lessons = await res.json();
      return lessons;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
        fetchLessons.fulfilled,
        (state, action: PayloadAction<LessonsItem[]>) => {
          state.lessons = action.payload;
        }
      )
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addLessons.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(deleteLessons.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter(
          (item) => item._id !== action.payload
        );
      })

      .addCase(changeLessons.fulfilled, (state, action) => {
        //console.log(action.payload._id);
        state.lessons.map((item) => {
          console.log(item);
          if (item._id === action.payload._id) {
            item.title = action.payload.title
          }
        });
      });
  },
});

export default lessonSlice.reducer;
