import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import Root from "./routes/Root/Root.jsx";
import Catalog from "./routes/Catalog/Catalog.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import SinglePage from "./routes/SinglePage/SinglePage.jsx";
import OrderHistory from "./routes/OrderHistory/OrderHistory.jsx";
import UserSettings from "./routes/UserSettings/UserSettings.jsx";
import UserNotFound from "./routes/UserSettings/UserNotFound.jsx";
import { API_URL } from "./utils/config";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
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
            path: ":type/:id", // Шлях для будинків у каталозі
            element: <SinglePage />, //  компонентa, яка показує сторінку для будинків
          },
        ],
      },
      {
        path: "/orderHistory/:user_id",
        element: <OrderHistory />,
        loader: async ({ params }) => {
          const req = await fetch(
            `${API_URL}/api/reservation/${params.user_id}`
          );
          const history = await req.json();
          return { history };
        },
      },
      {
        path: "/userSettings/:user_id",
        element: <UserSettings />,
        loader: async ({ params }) => {
          const req = await fetch(`${API_URL}/api/users/user/${params.user_id}`);
          const user = await req.json();

          return { user };
        },
      },
      {
        path: "/userNotFound",
        element: <UserNotFound />,
      },
    ],
  },
]);
export default router;
