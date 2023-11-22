import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../utils/contexts/ContextProvider";
import { Box } from "@mui/material/";
function LoginLayout() {
  const { user } = useStateContext();
  if (user?.token) {
    return <Navigate to={"/home"} />;
  }
  return (
    <div>
      <Box
        component="img"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: "0",
          left: "0",
        }}
        alt="The house from the offer."
        src={"https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg"}
      />
      <Outlet />
    </div>
  );
}

export default LoginLayout;
