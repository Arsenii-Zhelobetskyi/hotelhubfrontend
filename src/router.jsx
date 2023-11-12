import { createBrowserRouter } from "react-router-dom";
import { loader as singlePageLoader } from "./routes/SinglePage/SinglePage.jsx";
import { loader as catalogLoader } from "./routes/Catalog/components/Switch.jsx";
import {loader as orderHistoryLoader } from "./routes/OrderHistory/OrderHistory.jsx"
import Home from "./routes/Home/Home.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import Catalog from "./routes/Catalog/Catalog.jsx";
import Root from "./routes/Root/Root.jsx";
import SinglePage from "./routes/SinglePage/SinglePage.jsx";
import OrderHistory from "./routes/OrderHistory/OrderHistory.jsx";

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
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/catalog",
        children: [
          {
            index: true,
            element: <Catalog />,
            loader: catalogLoader,
          },
          {
            path: ":type/:id", // Шлях для будинків у каталозі
            element: <SinglePage />, //  компонентa, яка показує сторінку для будинків
            loader: singlePageLoader, //  свій loader
          },
        ],
      },
      {
        path: "/orderHistory/:user_id",
        element: <OrderHistory />,
        loader: orderHistoryLoader,
      },
    ],
  },
]);
export default router;
