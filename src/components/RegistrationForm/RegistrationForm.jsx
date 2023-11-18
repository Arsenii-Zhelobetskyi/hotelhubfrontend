import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function RegistrationForm({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the registration form.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
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
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RegistrationForm;

