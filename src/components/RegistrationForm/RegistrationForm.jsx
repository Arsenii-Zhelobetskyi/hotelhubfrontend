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
import { login } from "../../redux/slices/authorizationSlice.jsx";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/slices/usersSlice.jsx"; // Додано імпорт

function RegistrationForm({ onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    try {
      if (!name || !email || !password) {
        displayErrorMessage("Please fill out all fields.");
        return;
      }

      const result = await dispatch(
        createUser({
          name,
          email,
          password,
          role_id: 1,
          // Додайте інші дані за необхідності
        })
      );

      if (createUser.fulfilled.match(result)) {
        const data = result.payload.data;
        console.log("User successfully registered:", data);
        dispatch(login({ email, password }));
        navigate("/home");
        onClose();
      } else if (createUser.rejected.match(result)) {
        const errorData = result.payload;
        if (result.error.message === "User with this email already exists.") {
          console.error(
            "Error registering user: user with this email already exists."
          );
          displayErrorMessage("User with this email already exists.");
        } else {
          console.error("Error registering user.");
          // Обробте інші можливі помилки
        }
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        PaperProps={{
          style: {
            backgroundColor: "#1D1D1E",
            borderRadius: 10,
          },
        }}
      >
        <DialogTitle
          sx={{ color: "#FCFCFD", height: "65px", paddingTop: "25px" }}
        >
          Registration Form
        </DialogTitle>
        <DialogContent sx={{ padding: "15px 20px" }}>
          <DialogContentText sx={{ color: "#777E90", marginBottom: 1.7 }}>
            Please fill out the registration form.
          </DialogContentText>
          <TextField
            sx={{
              backgroundColor: "rgba(34,38,45,0.88)",
              borderRadius: 3,
            }}
            InputProps={{
              style: {
                color: "whitesmoke",
              },
            }}
            InputLabelProps={{
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
          <TextField
            sx={{
              backgroundColor: "rgba(34,38,45,0.88)",
              borderRadius: 3,
            }}
            InputProps={{
              style: {
                color: "whitesmoke",
              },
            }}
            InputLabelProps={{
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
          <TextField
            sx={{
              backgroundColor: "rgba(34,38,45,0.88)",
              borderRadius: 3,
            }}
            InputProps={{
              style: {
                color: "whitesmoke",
              },
            }}
            InputLabelProps={{
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
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </DialogContent>
        <DialogActions
          sx={{
            padding: "5px 20px 15px 15px",
            height: "60px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={handleLogin}
            variant="contained"
            color="secondary"
            sx={{
              marginRight: "100px",
              padding: "7px 15px",
              alignItem: "left",
            }}
          >
            Have an account
          </Button>
          <Button
            sx={{ padding: "7px 15px", color: "whitesmoke" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ padding: "7px 15px" }}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegistrationForm;
