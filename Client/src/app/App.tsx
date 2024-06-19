import { useState } from "react"
import Header from "../components/Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)

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
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
