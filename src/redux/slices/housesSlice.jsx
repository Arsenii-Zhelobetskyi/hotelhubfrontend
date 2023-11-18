import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";
export const fetchHouses = createAsyncThunk("fetchHouses", async () => {
  const response = await fetch(`${API_URL}/api/houses/`);
  const data = await response.json();
  return { data };
});

const housesSlice = createSlice({
  name: "houses",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchHouses.rejected, (state) => {
        state.isError = true;
      });
  },
});
export default housesSlice.reducer;
