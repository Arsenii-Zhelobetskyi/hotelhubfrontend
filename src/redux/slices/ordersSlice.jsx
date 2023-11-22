import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async ({ user_id }) => {
    const req = await fetch(`${API_URL}/api/reservation/${user_id}`);
    const data = await req.json();
    console.log(data);
    return { data };
  }
);
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isError = true;
      });
  },
});
export default ordersSlice.reducer;
