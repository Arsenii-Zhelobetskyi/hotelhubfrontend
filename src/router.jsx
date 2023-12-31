import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import Catalog from "./routes/Catalog/Catalog.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import SinglePage from "./routes/SinglePage/SinglePage.jsx";
import OrderHistory from "./routes/OrderHistory/OrderHistory.jsx";
import UserSettings from "./routes/UserSettings/UserSettings.jsx";
import UserNotFound from "./routes/UserSettings/UserNotFound.jsx";
import UserAccessDenied from "./routes/UserSettings/UserAccessDenied.jsx";
import OrderNow from "./routes/OrderNow/OrderNow.jsx";
import { API_URL } from "./utils/config";
import DefaultLayout from "./views/DefaultLayout/DefaultLayout.jsx";
import LoginLayout from "./views/LoginLayout/LoginLayout.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.jsx";
import AdminPanel from "./routes/AdminPanel/AdminPanel.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <DefaultLayout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const cities = await fetch(`${API_URL}/api/cities`);
          return cities;
        },
      },
      {
        path: "/home",
        element: <Home />,
        loader: async () => {
          const cities = await fetch(`${API_URL}/api/cities`);
          return cities;
        },
      },
      {
        path: "/catalog",
        children: [
          {
            index: true,
            element: <Catalog />,
          },
          {
            path: ":type/:id",
            element: <SinglePage />,
          },
        ],
      },
      {
        path: "/orderHistory/:user_id",
        element: <OrderHistory />,
      },
      {
        path: "/userSettings/:user_id",
        element: <UserSettings />,
        loader: async ({ params }) => {
          const req = await fetch(
            `${API_URL}/api/users/user/${params.user_id}`
          );
          const user = await req.json();

          return { user };
        },
      },
      {
        path: "/userNotFound",
        element: <UserNotFound />,
      },
      {
        path: "/userAccessDenied",
        element: <UserAccessDenied />,
      },
      {
        path: "/order-now/:type/:id",
        element: <OrderNow />,
      },
      {
        path: "/userNotFound",
        element: <UserNotFound />,
      },
      {
        path: "/userAccessDenied",
        element: <UserAccessDenied />,
      },
      {
        path: "/adminPanel",
        element: <AdminPanel />,
      },
    ],
  },
]);
export default router;
