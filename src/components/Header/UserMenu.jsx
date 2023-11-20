import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { Box } from "@mui/material";

function UserMenu() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const settings = [
    "Profile",
    "Account",
    "Registration",
    "Dashboard",
    "Logout",
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
    handleCloseUserMenu();
  };

  const handleRegistrationClose = () => {
    setShowRegistrationForm(false);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={
              setting === "Registration"
                ? handleRegistrationClick
                : handleCloseUserMenu
            }
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {showRegistrationForm && (
        <RegistrationForm onClose={handleRegistrationClose} />
      )}
    </Box>
  );
}

export default UserMenu;
