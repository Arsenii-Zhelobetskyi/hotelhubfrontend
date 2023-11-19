import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchSinglePage = createAsyncThunk(
  "fetchSinglePage",
  async ({ type, id }) => {
    const response = await fetch(`${API_URL}/api/${type}s/${type}/${id}`);
    const data = await response.json();
    return { data };
  }
);

const singlePageSlice = createSlice({
  name: "singlePage",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchSinglePage.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchSinglePage.rejected, (state, action) => {
        state.isError = true;
      });
  },
});
export default singlePageSlice.reducer;
