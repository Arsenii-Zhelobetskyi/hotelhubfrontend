import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchRooms = createAsyncThunk(
  "fetchRooms",
  async ({ id, page, limit }) => {
    const quantityResponse = await fetch(`${API_URL}/api/rooms/count?id=${id}`);
    const { quantity } = await quantityResponse.json();
    const response = await fetch(
      `${API_URL}/api/rooms/${id}?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return { data, quantity };
  }
);

export const fetchOccupiedPlacesByHotel = createAsyncThunk(
  "fetchOccupiedPlacesByHotel",
  async () => {
    const response = await fetch(`${API_URL}/api/rooms/occupiedPlacesByHotel`);
    const data = await response.json();
    return { data };
  }
);

export const updateRoom = createAsyncThunk("updateRoom", async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(data, "data");
    const response = await fetch(`${API_URL}/api/rooms/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const room = await response.json();
    return { room };
  } catch (error) {
    throw error;
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    quantity: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccupiedPlacesByHotel.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOccupiedPlacesByHotel.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchOccupiedPlacesByHotel.rejected, (state, action) => {
        state.isError = true;
      });
    builder
      .addCase(fetchRooms.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.quantity = parseInt(action.payload.quantity);
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isError = true;
      });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      // const updatedRoom = action.payload.room.data;
      // console.log(updatedRoom);
      // state.data = updatedRoom;
    });
  },
});
export default roomsSlice.reducer;
