import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText, Paper, Typography, IconButton, Button, TextField, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUsers, deleteUser, updateUser } from "../../redux/slices/usersSlice.jsx";

function AdminPanel() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedRoleId, setEditedRoleId] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    const handleEditUser = (userId, roleId) => {
        setEditingUserId(userId);
        setEditedRoleId(roleId);
    };

    const handleSaveChanges = () => {
        const userData = {
            id: editingUserId,
            role_id: editedRoleId,
        };
        dispatch(updateUser(userData));
        setEditingUserId(null);
        setEditedRoleId("");
    };

    return (
        <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
            <Typography variant="h5" gutterBottom>
                Admin Panel
            </Typography>
            <List>
                {users.users.map((user) => (
                    <ListItem key={user.id}>
                        {editingUserId === user.id ? (
                            // Режим редагування
                            <>
                                <TextField
                                    select
                                    label="Role"
                                    value={editedRoleId}
                                    onChange={(e) => setEditedRoleId(e.target.value)}
                                >
                                    <MenuItem value={2}>Administrator</MenuItem>
                                    <MenuItem value={1}>User</MenuItem>
                                </TextField>
                                <Button onClick={handleSaveChanges}>Save</Button>
                            </>
                        ) : (
                            // Режим перегляду
                            <>
                                <ListItemText primary={user.name} secondary={`Role: ${user.role_id}`} />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteUser(user.id)}
                                    style={{ color: "red" }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEditUser(user.id, user.role_id)}
                                    style={{ color: "SlateBlue" }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default AdminPanel;
