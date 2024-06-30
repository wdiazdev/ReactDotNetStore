import { ShoppingCart } from "@mui/icons-material"
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { useStoreContext } from "../app/context/StoreContext"
import { useReducer } from "react"

type Props = {
  handleDarkMode: () => void
  darkMode: boolean
}

const midNavLinks = [
  {
    title: "catalog",
    path: "/catalog",
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "contact",
    path: "/contact",
  },
]

const rightNavLinks = [
  {
    title: "login",
    path: "/login",
  },
  {
    title: "register",
    path: "/register",
  },
]

const navLinkStyles = {
  color: "inherit",
  "&:hover": {
    color: "grey.500",
    transition: "0.3s ease-in-out",
  },
  "&.active": {
    color: "text.secondary",
  },
}

export default function Header({ handleDarkMode, darkMode }: Props) {
  const { basket } = useStoreContext()

  const itemCount = basket?.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center">
          <Typography
            component={NavLink}
            to={"/"}
            variant="h5"
            sx={{ ...navLinkStyles, textDecoration: "none" }}
          >
            React-Store
          </Typography>
          <Switch size="small" onChange={handleDarkMode} checked={darkMode} sx={{ ml: 2 }} />
        </Box>

        <Box>
          <List sx={{ display: "flex" }}>
            {midNavLinks.map(({ title, path }) => (
              <ListItem key={path} component={NavLink} to={path} sx={navLinkStyles}>
                {title.toLocaleUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            component={Link}
            to="/basket"
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex", alignItems: "flex-end" }}>
            {rightNavLinks.map(({ title, path }) => (
              <ListItem key={path} component={NavLink} to={path} sx={navLinkStyles}>
                {title.toLocaleUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
