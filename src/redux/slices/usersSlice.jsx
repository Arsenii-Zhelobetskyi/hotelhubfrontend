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

export const updateUser = createAsyncThunk("updateUser", async (userData) => {
    const { id, name, email, password, role_id } = userData;
    const response = await fetch(`${API_URL}/api/users/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role_id }),
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
            })
            .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
              })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Оновлюємо стан, оновлюючи існуючого користувача
                state.users = state.users.map(user =>
                    user.id === action.payload.data.id ? action.payload.data : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isError = true;
                console.error("Error updating user:", action.error);
            });
    },
});

export default usersSlice.reducer;
