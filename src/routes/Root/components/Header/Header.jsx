import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.jsx";
import UserMenu from "./UserMenu.jsx";

function Header() {
  const pages = [
    { label: "Home", path: "/home" },
    { label: "Catalog", path: "/catalog" },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigateTo = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleNavigate = (path) => {
    navigateTo(path);
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HamburgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            pages={pages}
            handleNavigate={handleNavigate}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => handleNavigate(page.path)}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
