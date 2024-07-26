import { useCallback, useEffect, useState } from "react"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "../components/Loader"
import { useAppDispatch } from "./store/configureStore"
import { fetchBasketAsync } from "./store/basketSlice"
import { fetchCurrentUser } from "./store/accountSlice"
import Header from "../components/header/Header"

function App() {
  const dispatch = useAppDispatch()

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

  if (isLoading) return <Loader size="medium" message="Initializing app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
