import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchDataSearch = createAsyncThunk(
    "fetchDataSearch",
     async ({ accommodationType, city, startDate, endDate, guests }) => {
      const response = await fetch(`${API_URL}/api/search/${accommodationType}?city=${city}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`);
      const data = await response.json();
      return { data };
    }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataSearch.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchDataSearch.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default searchSlice.reducer;