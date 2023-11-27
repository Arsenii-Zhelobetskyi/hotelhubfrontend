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
export const updateSinglePage = createAsyncThunk(
  "updateSinglePage",
  async ({ type, info }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${API_URL}/api/${type}s/update/${info.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
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
    builder.addCase(updateSinglePage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSinglePage.fulfilled, (state, action) => {
      console.log(action.payload.data, "action.payload.room.data");
      state.data = action.payload.data;
      state.isLoading = false;
    });
  },
});
export default singlePageSlice.reducer;
