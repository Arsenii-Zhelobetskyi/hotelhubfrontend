import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/";
function RegistrationForm({ onClose }) {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCloseError = () => {
        setError(null);
    };

    const displayErrorMessage = (message) => {
        setError(message);
    };
    const handleLogin = async () => {
        navigate("/login");
    };

    const handleSubmit = async () => {
        try {
            if (!name || !email || !password) {
                displayErrorMessage('Please fill out all fields.');
                return;
            }

            const url = 'http://localhost:3000/api/users/create';
            // Replace with your actual URL

            const uploadData = {
                name,
                email,
                password,
                role_id: 1,
                // Add other data if necessary
            };

            console.log(uploadData);

            const result = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadData),
            });

            if (result.ok) {
                const data = await result.json();
                console.log('User successfully registered:', data);
                // You can perform additional actions after successful registration here
                onClose();
            } else {
                const errorData = await result.json();

                if (result.status === 500 && errorData.error === "Internal Server Error") {
                    console.error('Error registering user: user with this email already exists.');
                    displayErrorMessage('User with this email already exists.');
                } else {
                    console.error('Error registering user.');
                    // Handle other possible errors
                }
            }
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };

    return (
        <>
            <Dialog open={true} onClose={onClose}  PaperProps={{
                style: {
                backgroundColor: "#1D1D1E",
                borderRadius: 10,
                },
            }}>
                <DialogTitle sx={{ color: "#FCFCFD" , height: "65px", paddingTop: "25px"}}>Registration Form</DialogTitle>
                <DialogContent  sx={{ padding: "15px 20px"}}>
                    <DialogContentText sx={{ color: "#777E90", marginBottom: 1.7}}>
                        Please fill out the registration form.
                    </DialogContentText>
                    <TextField sx={{
                        backgroundColor: "rgba(34,38,45,0.88)",
                        borderRadius: 3,
                        }} InputProps={{
                          style: {
                              color: "whitesmoke",
                        }
                      }} InputLabelProps={{
                        style: {
                          color: "white", 
                        },
                      }}
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField sx={{
                        backgroundColor: "rgba(34,38,45,0.88)",
                        borderRadius: 3,
                        }} InputProps={{
                          style: {
                              color: "whitesmoke",
                        }
                      }} InputLabelProps={{
                        style: {
                          color: "white", 
                        },
                      }}
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField sx={{
                        backgroundColor: "rgba(34,38,45,0.88)",
                        borderRadius: 3,
                        }} InputProps={{
                          style: {
                              color: "whitesmoke",
                        }
                      }} InputLabelProps={{
                        style: {
                          color: "white", 
                        },
                      }}
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {error && (
                        <p style={{ color: 'red', marginTop: '10px' }}>
                            {error}
                        </p>
                    )}
                </DialogContent>
                <DialogActions sx={{ padding: "5px 20px 15px 15px", height: "60px", display: "flex", justifyContent: "space-around" }}>
                    <Button onClick={handleLogin} variant="contained" color="secondary" sx={{ marginRight: "100px", padding: "7px 15px", alignItem: "left"}}>
                        Have an account
                    </Button>
                    <Button sx={{ padding: "7px 15px", color: "whitesmoke" }} onClick={onClose}>Cancel</Button>
                    <Button sx={{ padding: "7px 15px" }} onClick={handleSubmit} variant="contained" color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RegistrationForm;

