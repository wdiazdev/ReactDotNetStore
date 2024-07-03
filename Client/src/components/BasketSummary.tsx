import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material"
import { currencyFormat } from "../app/utils/utils"
import { useAppSelector } from "../app/store/configureStore"

export default function BasketSummary() {
  const { basket } = useAppSelector((state) => state.basket)

  const subtotal = basket?.items.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0
  const deliveryFee = basket?.items.length === 0 ? 0 : subtotal > 10000 ? 0 : 500
  const total = subtotal + deliveryFee

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{currencyFormat(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
