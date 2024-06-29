import { useEffect, useState } from "react"
import { Basket as StoreBasket } from "../models"
import agent from "../app/api/agent"
import Loader from "../components/Loader"
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Delete } from "@mui/icons-material"

export default function Basket() {
  const [isLoading, setIsLoading] = useState(true)
  const [basket, setBasket] = useState<StoreBasket | null>(null)

  useEffect(() => {
    agent.Basket.getBasket()
      .then((basket) => setBasket(basket))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loader size="medium" message="Loading basket..." />

  if (!isLoading && !basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.items.map((item) => {
            const itemPrice = `$${(item.price / 100).toFixed(2)}`
            const subTotal = `$${((item.price / 100) * item.quantity).toFixed(2)}`

            return (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  {item.name}
                </TableCell>
                <TableCell align="right">{itemPrice}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{subTotal}</TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
