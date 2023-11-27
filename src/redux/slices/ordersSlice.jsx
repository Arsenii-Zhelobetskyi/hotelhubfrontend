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
export const addOrder = createAsyncThunk(
  "addOrder",
  async ({ resObj, order, pay }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response1 = await fetch(
        `${API_URL}/api/reservation/create-reservation-obj?type=${resObj.type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: resObj.id }),
        }
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const createReservationObject = await response1.json();

      const response2 = await fetch(
        `${API_URL}/api/reservation/create?resObj=${createReservationObject.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order }),
        }
      );
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }
      const createReservation = await response2.json();

      const response3 = await fetch(
        `${API_URL}/api/reservation/create-pay?resId=${createReservation.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pay }),
        }
      );
      return await response3.json();
    } catch (error) {
      throw error;
    }
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
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});
export default ordersSlice.reducer;
