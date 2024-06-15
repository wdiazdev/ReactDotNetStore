import { useState } from "react"
import Catalog from "../components/Catalog"
import Header from "../components/Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"

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
      <CssBaseline />
      <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
