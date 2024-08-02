import { useCallback, useEffect, useState } from "react"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "../components/Loader"
import { useAppDispatch } from "./store/configureStore"
import { fetchBasketAsync } from "./store/basketSlice"
import { fetchCurrentUser } from "./store/accountSlice"
import Header from "../components/header/Header"
import Home from "../pages/Home"

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync())
    } catch (error) {
      console.log("error:", error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setIsLoading(false))
  }, [initApp])

  const paletteType = darkMode ? "dark" : "light"
  const backgroundColor = darkMode ? "#121212" : "#eaeaea"

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: backgroundColor,
      },
    },
  })

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      {isLoading ? (
        <Loader size="medium" message="Initializing app..." />
      ) : location.pathname === "/" ? (
        <Home />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      )}
    </ThemeProvider>
  )
}

export default App
