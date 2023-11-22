import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const login = createAsyncThunk("login", async (log) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/api/authorization/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(log),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("logout", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("ACCESS");
  } catch (error) {
    throw error;
  }
});

const authorizationSlice = createSlice({
  name: "authorization",
  initialState: {
    isLoading: false,
    user: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userId = null;
      state.user = null;
    });
  },
});

export default authorizationSlice.reducer;
