import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "../App"
import ServerError from "../api/errors/ServerError"
import NotFound from "../api/errors/NotFound"
import RequiredAuth from "./RequiredAuth"
import Orders from "../../pages/orders/Orders"
import CheckoutWrapper from "../../pages/checkout/CheckoutWrapper"
import Catalog from "../../pages/catalog/Catalog"
import ProductDetails from "../../pages/ProductDetails"
import About from "../../pages/About"
import Contact from "../../pages/Contact"
import Basket from "../../pages/basket/Basket"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
import Inventory from "../admin/Inventory"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //authentication required routes
      {
        element: <RequiredAuth />,
        children: [
          {
            path: "checkout",
            element: <CheckoutWrapper />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      // admin required routes
      {
        element: <RequiredAuth roles={["Admin"]} />,
        children: [
          {
            path: "inventory",
            element: <Inventory />,
          },
        ],
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
