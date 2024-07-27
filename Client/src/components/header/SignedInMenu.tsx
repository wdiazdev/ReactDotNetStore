import { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { signOut } from "../../app/store/accountSlice"
import { clearBasket } from "../../app/store/basketSlice"
import { Link } from "react-router-dom"

export default function SignedInMenu() {
  const { user } = useAppSelector((state) => state.account)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders" onClick={handleClose}>
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut())
            dispatch(clearBasket())
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
