import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { createTheme, ThemeProvider } from "@mui/material/";
import store from "../../redux/store.jsx";
import { Provider } from "react-redux";
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
      default: "#1D1D1E",
      light: "#EAF0FF",
      dark: "#171616D6",
      grey: "rgba(34,38,45,0.88)",
    },
    text: {
      primary: "#FCFCFD",
      secondary: "#777E90",
      dark: "#141416",
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

    MuiDivider: {
      styleOverrides: {
        root: () => ({
          border: `1px solid ${theme.palette.secondary.main}`,
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: () => ({
          backgroundColor: theme.palette.background.dark,
          color: theme.palette.text.primary,
          borderRadius: "10px",
        }),
      },
    },
  },
});

theme.typography.hero = {
  fontSize: "48px",
  fontWeight: "bold",
  display: "block",
};

theme.typography.headline1 = {
  fontSize: "40px",
  color: theme.palette.secondary.main,
  display: "block",
};
theme.typography.headline2 = {
  fontSize: "32px",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  display: "block",
};
theme.typography.headline3 = {
  fontSize: "20px",
  color: theme.palette.text.primary,
  display: "block",
};

theme.typography.caption1 = {
  fontSize: "18px",
  color: theme.palette.secondary.main,
  display: "block",
};
theme.typography.caption2 = {
  fontSize: "14px",
  color: theme.palette.secondary.main,
  display: "block",
};

theme.typography.body = {
  fontSize: "16px",
  color: theme.palette.secondary.main,
};

function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <div className={"App-body"}>
          <CssBaseline />
          <Outlet />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default Root;
