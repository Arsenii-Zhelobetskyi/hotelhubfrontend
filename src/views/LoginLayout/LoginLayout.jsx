import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../utils/contexts/ContextProvider";
function LoginLayout() {
  const { user } = useStateContext();
  if (user?.token) {
    return <Navigate to={"/home"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default LoginLayout;
