import React from "react"
import ReactDOM from "react-dom/client"
import "./app/styles.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/route/Routes"
import { StoreProvider } from "./app/context/StoreContext"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StoreProvider>
  </React.StrictMode>,
)
