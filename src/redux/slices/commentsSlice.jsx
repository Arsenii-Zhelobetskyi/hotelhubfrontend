import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

export const fetchComments = createAsyncThunk(
  "fetchComments",
  async ({ type, id, page, limit, orderBy }) => {
    const quantityResponse = await fetch(
      `${API_URL}/api/comments/count?type=${type}&id=${id}`
    );
    const { quantity } = await quantityResponse.json();

    const commentsResponse = await fetch(
      `${API_URL}/api/comments/${id}?type=${type}&page=${page}&limit=${limit}&orderBy=${orderBy}`
    );
    /* const commentsResponse = await fetch(
      `${API_URL}/api/comments/${id}?type=${type}&page=${page}&limit=${limit}`
    ); */
    const data = await commentsResponse.json();

    return { data, quantity };
  }
);
export const addComment = createAsyncThunk(
  "addComment",
  async ({ comment, type }) => {
    // eslint-disable-next-line no-useless-catch
    try {
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
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async ({ id, type }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${API_URL}/api/comments/delete/${id}?type=${type}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return id;
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
    quantity: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.quantity = parseInt(action.payload.quantity);
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});
export default commentsSlice.reducer;
