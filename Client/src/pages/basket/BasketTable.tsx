import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material"
import { removeBasketItemAsync, addBasketItemAsync } from "../../app/store/basketSlice"
import { currencyFormat } from "../../app/utils/utils"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { BasketItem } from "../../models"

interface Props {
  items: BasketItem[]
  isBasket?: boolean
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            return (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  <Box display="flex" alignItems="center" width="100%">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  {isBasket && (
                    <LoadingButton
                      color="error"
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          }),
                        )
                      }
                      loading={status === "pendingRemoveItem" + item.productId + "rem"}
                    >
                      <Remove />
                    </LoadingButton>
                  )}
                  {item.quantity}
                  {isBasket && (
                    <LoadingButton
                      color="primary"
                      onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                      loading={status === "pendingAddItem" + item.productId}
                    >
                      <Add />
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  {isBasket && (
                    <LoadingButton
                      color="error"
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "del",
                          }),
                        )
                      }
                      loading={status === "pendingRemoveItem" + item.productId + "del"}
                    >
                      <Delete />
                    </LoadingButton>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
