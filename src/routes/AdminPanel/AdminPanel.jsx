import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";  // Імпорт іконки корзини
import { fetchUsers, deleteUser } from "../../redux/slices/usersSlice.jsx";

function AdminPanel() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
            <Typography variant="h5" gutterBottom>
                Admin Panel
            </Typography>
            <List>
                {users.users.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} />
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteUser(user.id)}
                            style={{ color: "red" }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default AdminPanel;


