import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import Root from "./routes/Root/Root.jsx";
import Catalog from "./routes/Catalog/Catalog.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import SinglePage from "./routes/SinglePage/SinglePage.jsx";
import OrderHistory from "./routes/OrderHistory/OrderHistory.jsx";
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
            loader: async () => {
              const res = await Promise.all([
                fetch(`${API_URL}/api/hotels/`),
                fetch(`${API_URL}/api/rooms/occupiedPlacesByHotel`),
                fetch(`${API_URL}/api/houses/`),
              ]);
              const data = await Promise.all(
                res.map(async (r) => await r.json())
              );
              return data;
            },
          },
          {
            path: ":type/:id", // Шлях для будинків у каталозі
            element: <SinglePage />, //  компонентa, яка показує сторінку для будинків
            loader: async ({ params }) => {
              const req = await fetch(
                `${API_URL}/api/${params.type}s/${params.type}/${params.id}`
              );
              const data = await req.json();
              return { data };
            }, //  свій loader
          },
        ],
      },
      {
        path: "/orderHistory/:user_id",
        element: <OrderHistory />,
        loader: async ({ params }) => {
          const req = await AJAX(
            `${API_URL}/api/reservation/${params.user_id}`
          );
          const history = await req.json();
          console.log(history);
          return { history };
        },
      },
    ],
  },
]);
export default router;
