import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/register", data);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
  try {
    const res = await api.post("/login", data);
    return res?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error?.response);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.created = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
