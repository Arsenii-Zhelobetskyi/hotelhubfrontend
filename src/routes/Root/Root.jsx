import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3B71FE",
      light: "#8BC5E5",
    },
    secondary: {
      main: "#777E90",
      light: "#353945",
    },
    background: {
      default: "#141416",
    },
    text: {
      primary: "#FCFCFD",
      secondary: "#777E90",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor:
            ownerState.color === "primary"
              ? theme.palette.primary.main
              : "Transparent",
          border:
            ownerState.color === "primary"
              ? "none"
              : "3px solid " + theme.palette.secondary.main,
          "&:hover": {
            backgroundColor:
              ownerState.color === "primary"
                ? theme.palette.primary.light
                : theme.palette.secondary.light,
          },
          color: theme.palette.text.primary,
          boxShadow: "none",
          borderRadius: "50px",
          padding: "10px 30px",
        }),
      },
      defaultProps: {
        disableRipple: true, //усі кнопки тепер без пульсацій
      },
    },
  },
});

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={"App-body"}>
        <CssBaseline />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default Root;
