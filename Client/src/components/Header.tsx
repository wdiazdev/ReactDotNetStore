import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

type Props = {
  handleDarkMode: () => void
  darkMode: boolean
}

export default function Header({ handleDarkMode, darkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography>React-Store</Typography>
        <Switch size="small" onChange={handleDarkMode} checked={darkMode} />
      </Toolbar>
    </AppBar>
  )
}
