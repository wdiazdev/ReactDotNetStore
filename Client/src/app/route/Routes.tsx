import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "../App"
import {
  About,
  Catalog,
  Contact,
  Home,
  ProductDetails,
  Basket,
  Checkout,
  Login,
  Register,
} from "../../pages"
import ServerError from "../api/errors/ServerError"
import NotFound from "../api/errors/NotFound"
import RequiredAuth from "./RequiredAuth"
import Orders from "../../pages/orders/Orders"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequiredAuth />,
        children: [
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
])
