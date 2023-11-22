import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../utils/contexts/ContextProvider";
function LoginLayout() {
  const { name, email, token } = useStateContext();
  if (token) {
    return <Navigate to={"/home"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default LoginLayout;
