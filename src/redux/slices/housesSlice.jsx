import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";
export const fetchHouses = createAsyncThunk(
  "fetchHouses",
  async ({ page, limit }) => {
    const quantityResponse = await fetch(`${API_URL}/api/houses/count`);
    const { quantity } = await quantityResponse.json();
    const response = await fetch(
      `${API_URL}/api/houses/?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return { data, quantity };
  }
);

export const updateHouse = createAsyncThunk("updateHouse", async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/api/houses/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const house = await response.json();
    return { house };
  } catch (error) {
    throw error;
  }
});

const housesSlice = createSlice({
  name: "houses",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    quantity: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.quantity = parseInt(action.payload.quantity);
      })
      .addCase(fetchHouses.rejected, (state) => {
        state.isError = true;
      });
    builder.addCase(updateHouse.fulfilled, (state, action) => {
      // const updatedRoom = action.payload.room.data;
      // console.log(updatedRoom);
      // state.data = updatedRoom;
    });
  },
});
export default housesSlice.reducer;
