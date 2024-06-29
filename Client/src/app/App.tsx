import { useEffect, useState } from "react"
import Header from "../components/Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useStoreContext } from "./context/StoreContext"
import { getCookie } from "./utils/utils"
import agent from "./api/agent"
import Loader from "../components/Loader"

function App() {
  const { setBasket } = useStoreContext()
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const buyerId = getCookie("buyerId")
    console.log("buyerId:", buyerId)
    if (buyerId) {
      agent.Basket.getBasket()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [setBasket])

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
