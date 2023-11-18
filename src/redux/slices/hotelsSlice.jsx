import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";
export const fetchHotels = createAsyncThunk("fetchHotels", async () => {
  const response = await fetch(`${API_URL}/api/hotels/`);
  const data = await response.json();
  return { data };
});

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchHotels.rejected, (state) => {
        state.isError = true;
      });
  },
});
export default hotelsSlice.reducer;
