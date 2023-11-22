import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { ThemeProvider } from "@mui/material/";
import theme from "../../assets/theme.jsx";

import { useStateContext } from "../../utils/contexts/ContextProvider.jsx";
import { useDispatch } from "react-redux";

export default function DefaultLayout() {
  const { user } = useStateContext();
  const dispatch = useDispatch();
  if (!user?.token) {
    return <Navigate to={"/login"} />;
  }
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
