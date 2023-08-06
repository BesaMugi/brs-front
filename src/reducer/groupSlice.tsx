import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  surName: string;
  groups: string;
  lessons: string;
  login: string;
}

interface Lesson {
  _id: string;
  title: string;
}

interface Group {
  _id: string;
  name: string;
  users: User[];
  lessons: Lesson[];
}

interface GroupsState {
  groups: Group[];
  error: string | null | unknown;
  loading: Boolean;
}

const initialState: GroupsState = {
  groups: [],
  error: null,
  loading: false,
};

type GroupId_UserId_LessonId = {
  groupId: string;
  userId: string;
  lessonId: string;
};

export const fetchGroups = createAsyncThunk<Group[]>(
  //показ групп
  "fetch/groups",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/groups`);
      const groups = await res.json();
      return groups;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGroups = createAsyncThunk<Group[], string>(
  //создание группы
  "create/group",
  async (name, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteGroups = createAsyncThunk<string, string>(
  //удаление группы
  "delete/groups",
  async (groupId, thunkAPI) => {
    try {
      await fetch(`http://localhost:3000/group/${groupId}`, {
        method: "DELETE",
      });
      return groupId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateGroupsInStore = createAsyncThunk<
  //изменение названия группы
  { groupId: string; updatedGroupName: string },
  { groupId: string; updatedGroupName: string }
>("edit/groups", async ({ groupId, updatedGroupName }, thunkAPI) => {
  try {
    await fetch(`http://localhost:3000/group/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedGroupName }),
    });
    return { groupId, updatedGroupName };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addUserInGroup = createAsyncThunk<
  //добавление пользователя в группу
  { groupId: string; data: any },
  GroupId_UserId_LessonId,
  { rejectValue: unknown }
>("addUser/groups", async ({ groupId, userId }, thunkAPI) => {
  try {
    const res = await fetch(
      `http://localhost:3000/group/${groupId}/add-user/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return { groupId, data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteUserFromGroup = createAsyncThunk<
  //удаление пользователя из группы
  { groupId: string; userId: string },
  GroupId_UserId_LessonId,
  { rejectValue: unknown }
>("deleteUser/groups", async ({ groupId, userId }, thunkAPI) => {
  try {
    const res = await fetch(
      `http://localhost:3000/group/${groupId}/delete-user/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return { groupId, userId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLessonInGroup = createAsyncThunk<
  //добавление предмета в группу
  { groupId: string; data: any },
  GroupId_UserId_LessonId,
  { rejectValue: unknown }
>("addLesson/groups", async ({ groupId, lessonId }, thunkAPI) => {
  try {
    const res = await fetch(
      `http://localhost:3000/group/${groupId}/add-lesson/${lessonId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return { groupId, data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLessonFromGroup = createAsyncThunk<
  //удаление предмета из группы
  { groupId: string; lessonId: string },
  GroupId_UserId_LessonId,
  { rejectValue: unknown }
>("deleteLesson/group", async ({ groupId, lessonId }, thunkAPI) => {
  try {
    const res = await fetch(
      `http://localhost:3000/group/${groupId}/delete-user/${lessonId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return { groupId, lessonId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(
        createGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.groups = state.groups.concat(action.payload);
        }
      )
      .addCase(deleteGroups.fulfilled, (state, action) => {
        state.groups = state.groups.filter(
          (group) => group._id !== action.payload
        );
      })
      .addCase(deleteGroups.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(
        updateGroupsInStore.fulfilled,
        (
          state,
          action: PayloadAction<{ groupId: string; updatedGroupName: string }>
        ) => {
          state.groups = state.groups.map((item) => {
            if (item._id === action.payload.groupId) {
              return { ...item, name: action.payload.updatedGroupName };
            }
            return item;
          });
        }
      )
      .addCase(updateGroupsInStore.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addUserInGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((item) => {
          if (item._id === action.payload.groupId) {
            item.users.push(action.payload.data);
          }
          return item;
        });
      })
      .addCase(deleteUserFromGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((item) => {
          if (item._id === action.payload.groupId) {
            item.users = item.users.filter(
              (user) => user._id !== action.payload.userId
            );
          }
          return item;
        });
      })
      .addCase(addLessonInGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((item) => {
          if(item._id === action.payload.groupId) {
            item.users.push(action.payload.data);
          }
          return item;
        })
      })
      .addCase(deleteLessonFromGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((item) => {
          if(item._id === action.payload.groupId) {
            item.users = item.users.filter(
              (user) => user._id !== action.payload.lessonId
            );
          }
          return item;
        })
      })
  },
});

export default groupsSlice.reducer;
