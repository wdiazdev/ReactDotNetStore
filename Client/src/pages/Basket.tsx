import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Add, Delete, Remove } from "@mui/icons-material"
import { currencyFormat } from "../app/utils/utils"
import { LoadingButton } from "@mui/lab"
import BasketSummary from "../components/BasketSummary"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"
import { addBasketItemAsync, removeBasketItemAsync } from "../app/store/basketSlice"

export default function Basket() {
  const { basket, status } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item) => {
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
                    {item.quantity}
                    <LoadingButton
                      color="primary"
                      onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                      loading={status === "pendingAddItem" + item.productId}
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
