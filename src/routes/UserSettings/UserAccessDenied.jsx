import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function UserAccessDenied() {
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
                You are trying to access the settings of another user.
            </Typography>
            <Button component={Link} to="/home" variant="contained" color="primary">
                Return to the home page
            </Button>
        </Box>
    );
}

export default UserAccessDenied;