import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function UserNotFound() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Нажаль, такого користувача не існує.
            </Typography>
            <Button component={Link} to="/home" variant="contained" color="primary">
                Повернутися на головну сторінку
            </Button>
        </Box>
    );
}

export default UserNotFound;
