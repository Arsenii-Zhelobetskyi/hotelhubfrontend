import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  TextField,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { API_URL } from "../../utils/config.js";

function UserSettings() {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [selectedTab, setSelectedTab] = useState(0);
  const [actionType, setActionType] = useState("name");
  const [newName, setNewName] = useState(user ? user.name : "");
  const [newEmail, setNewEmail] = useState(user ? user.email : "");
  const [newPassword, setNewPassword] = useState(user ? user.password : "");

  const checker = window.location.pathname.split("/").pop();
  const data = localStorage.getItem("ACCESS");
  const parsedData = JSON.parse(data);
  const userId = parsedData.id;
  console.log(userId);
  console.log(checker);
  useEffect(() => {
    setNewName(user ? user.name : "");
    setNewEmail(user ? user.email : "");
    setNewEmail(user ? user.password : "");
  }, [user]);

  useEffect(() => {
    if ((!user || !user.id)) {
      navigate("/userNotFound");
    } else if(checker != userId) {
      navigate("/userAccessDenied")
    }
  }, [user, navigate]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleActionTypeChange = (event) => {
    setActionType(event.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const url = `${API_URL}/api/users/update/${user.id}`;

      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      if (result.ok) {
        const updatedUser = await result.json();
        setNewName(updatedUser.name);
        setNewEmail(updatedUser.email);
        setNewPassword(updatedUser.password);
      } else {
        console.error("Error saving changes:", result.statusText);
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const url = `${API_URL}/api/users/delete/${user.id}`;

      const result = await fetch(url, {
        method: "DELETE",
      });

      if (result.ok) {
        console.log("User deleted successfully");
        navigate("/userNotFound");
      } else {
        console.error("Error deleting user:", result.statusText);
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <div>
      <BottomNavigation
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ backgroundColor: "transparent" }}
      >
        <BottomNavigationAction
          label="Info"
          icon={<PersonIcon />}
          sx={{
            color: selectedTab === 0 ? "blue" : "gray",
            borderRadius: "12px",
          }}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          sx={{
            color: selectedTab === 1 ? "blue" : "gray",
            borderRadius: "12px",
          }}
        />
      </BottomNavigation>

      {selectedTab === 0 && (
        <Card
          style={{
            margin: "16px",
            borderRadius: 15,
            color: "white",
            minWidth: "400px",
            width: "60vw",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              User name: {newName}
            </Typography>
            <Typography variant="subtitle1">Email: {newEmail}</Typography>
          </CardContent>
        </Card>
      )}

      {selectedTab === 1 && (
        <Card style={{ margin: "16px", borderRadius: 15 }}>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Action</FormLabel>
              <RadioGroup
                row
                aria-label="actionType"
                name="actionType"
                value={actionType}
                onChange={handleActionTypeChange}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Change Name"
                />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Change Email"
                />
                <FormControlLabel
                  value="password"
                  control={<Radio />}
                  label="Change Password"
                />
              </RadioGroup>
            </FormControl>

            {actionType === "name" && (
              <>
                <TextField
                  label="New Name"
                  fullWidth
                  value={newName}
                  onChange={handleNameChange}
                  margin="normal"
                />
              </>
            )}

            {actionType === "email" && (
              <>
                <TextField
                  label="New Email"
                  fullWidth
                  value={newEmail}
                  onChange={handleEmailChange}
                  margin="normal"
                />
              </>
            )}

            {actionType === "password" && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                />
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UserSettings;
