import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";
export const fetchHotels = createAsyncThunk(
  "fetchHotels",
  async ({ page, limit }) => {
    const quantityResponse = await fetch(`${API_URL}/api/hotels/count`);
    const { quantity } = await quantityResponse.json();
    const response = await fetch(
      `${API_URL}/api/hotels/?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return { data, quantity };
  }
);

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    quantity: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.quantity = parseInt(action.payload.quantity);
      })
      .addCase(fetchHotels.rejected, (state) => {
        state.isError = true;
      });
  },
});
export default hotelsSlice.reducer;
