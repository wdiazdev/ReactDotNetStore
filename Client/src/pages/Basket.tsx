import {
  Box,
  Grid,
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
import { Add, Delete, Remove } from "@mui/icons-material"
import { currencyFormat } from "../app/utils/utils"
import { useStoreContext } from "../app/context/StoreContext"
import { useState } from "react"
import agent from "../app/api/agent"
import { LoadingButton } from "@mui/lab"
import BasketSummary from "../components/BasketSummary"

export default function Basket() {
  const { basket, setBasket, removeItem } = useStoreContext()
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  })

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name })
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }))
  }

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name })
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }))
  }

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
                      onClick={() => handleRemoveItem(item.productId, 1, "rem" + item.productId)}
                      loading={status.loading && status.name === "rem" + item.productId}
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      color="primary"
                      onClick={() => handleAddItem(item.productId, "add" + item.productId)}
                      loading={status.loading && status.name === "add" + item.productId}
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      color="error"
                      onClick={() =>
                        handleRemoveItem(item.productId, item.quantity, "del" + item.productId)
                      }
                      loading={status.loading && status.name === "del" + item.productId}
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
        </Grid>
      </Grid>
    </>
  )
}
