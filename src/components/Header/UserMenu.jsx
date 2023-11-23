import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authorizationSlice.jsx";

function UserMenu() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.authorization.user.id);
  const userRole = useSelector((state)=> state.authorization.user.role_id);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Account") {
      navigate(`/userSettings/${userId}`);
      console.log(parsedData);
    } else if (setting === "Logout") {
      handleLogout();
    } else if (setting === "My Orders") {
      navigate(`/orderHistory/${userId}`);
    } else if (setting === "Admin panel") {
      navigate(`/adminPanel`);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAnchorElUser(null);
    }
  };

  const settings = ["Account", "My Orders", "Admin panel", "Logout"];

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
        onClose={() => handleCloseUserMenu()}
      >
        {settings.map((setting) => (
            (setting === "Admin panel" && userRole === 2) ? (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ) : (
                setting !== "Admin panel" && (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                )
            )
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
