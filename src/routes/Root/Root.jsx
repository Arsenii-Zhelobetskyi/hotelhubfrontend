import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#92A5EF",
      light: "#8BC5E5",
      dark: "#3B71FE",
    },
    secondary: {
      main: "#A4CDE3",
      light: "#E4D7CF",
      dark: "#FA8F54",
    },
    typography: {
      icon: "#3B71FE",
    },
    vars: {
      palette: {
        text: {
          icon: "#3B71FE",
        },
      },
    },
  },
});

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={"App-body"}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default Root;
