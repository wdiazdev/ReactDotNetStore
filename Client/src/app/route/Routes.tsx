import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { About, Catalog, Contact, Home, ProductDetails } from "../../pages"
import ServerError from "../api/errors/ServerError"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "server-error",
        element: <ServerError />,
      },
    ],
  },
])
