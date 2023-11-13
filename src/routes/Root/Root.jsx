import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3B71FE",
      dark: "#2756CC",
    },
    secondary: {
      main: "#777E90",
      dark: "#353945",
    },
    background: {
      default: "#141416",
      light: "#EAF0FF",
    },
    text: {
      primary: "#FCFCFD",
      secondary: "#777E90",
      dark: "#141416",
    },
  },
  typography: {
    h2: {
      fontSize: "48px",
      fontWeight: "bold",
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
          padding: ownerState.color === "primary" ? "12px 30px" : "10px 30px",
          "&:hover": {
            backgroundColor:
              ownerState.color === "primary"
                ? theme.palette.primary.dark
                : theme.palette.secondary.dark,
          },
          color: theme.palette.text.primary,
          boxShadow: "none",
          borderRadius: "50px",
        }),
      },
      defaultProps: {
        disableRipple: true, //усі кнопки тепер без пульсацій
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: theme.palette.background.default,
          border:
            ownerState.color === "secondary"
              ? "none"
              : "2px solid " + theme.palette.secondary.light,
          padding: ownerState.color === "primary" ? "12px 30px" : "10px 30px",
          color: theme.palette.text.primary,
          boxShadow: "none",
          borderRadius: "20px",
        }),
      },
    },
  },
});

theme.typography.secondary = {
  fontSize: "16px",
  color: theme.palette.secondary.main,
  display: "block",
};

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
