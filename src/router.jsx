import { createBrowserRouter } from "react-router-dom";
import { loader as singlePageLoader } from "./routes/SinglePage/SinglePage.jsx";
import Home from "./routes/Home/Home.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import Catalog from "./routes/Catalog/Catalog.jsx";
import Root from "./routes/Root/Root.jsx";
import SinglePage from "./routes/SinglePage/SinglePage.jsx";
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
        element: <Catalog />,
      },
      {
        path: "/single-page/:id",
        element: <SinglePage />,
        loader: singlePageLoader,
      },
    ],
  },
]);
export default router;
