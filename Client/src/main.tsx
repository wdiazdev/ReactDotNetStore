import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./app/styles.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/route/Routes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
