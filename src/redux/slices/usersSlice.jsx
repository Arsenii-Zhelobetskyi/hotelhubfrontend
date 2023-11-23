import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";


export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const req = await fetch(`${API_URL}/api/users/`); // Змініть шлях на свій
    const data = await req.json();
    console.log(data);
    return {data};
});

export const deleteUser = createAsyncThunk("deleteUser", async (userId) => {
    const response = await fetch(`${API_URL}/api/users/delete/${userId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    return { data };
});

const usersSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isLoading: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.isError = true;
            })
             .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Оновлюємо стан, видаляючи користувача
                state.users = state.users.filter(user => user.id !== action.meta.arg);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isError = true;
                console.error("Error deleting user:", action.error);
            });
    },
});

export default usersSlice.reducer;
