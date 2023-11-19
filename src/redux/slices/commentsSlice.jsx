import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchComments = createAsyncThunk(
  "fetchComments",
  async ({ type, id }) => {
    const response = await fetch(`${API_URL}/api/comments/${id}?type=${type}`);
    const data = await response.json();
    return { data };
  }
);
export const addComment = createAsyncThunk(
  "addComment",
  async ({ comment, type }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log(comment);
      console.log(type);
      const response = await fetch(
        `${API_URL}/api/comments/create?type=${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});
export default commentsSlice.reducer;
