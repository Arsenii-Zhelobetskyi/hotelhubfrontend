import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.jsx";
import UserMenu from "./UserMenu.jsx";
import Box from "@mui/material/Box";

function Header() {
  const pages = [
    { label: "Home", path: "/home" },
    { label: "Catalog", path: "/catalog" },
  ];
  const theme = useTheme();
  const navigateTo = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
    <AppBar position="fixed" sx={{ backgroundColor: "background.default" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HamburgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            pages={pages}
            handleNavigate={handleNavigate}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", alignItems: "center" },
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "5%",
                marginRight: "10px",
                "&:hover": { cursor: "pointer" },
              }}
              src={"/src/assets/logov2.svg"}
              alt="House photo"
              onClick={() => handleNavigate("/home")}
            ></Box>
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
