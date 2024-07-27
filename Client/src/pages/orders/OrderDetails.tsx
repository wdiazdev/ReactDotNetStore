import { Box, Button, Grid, Typography } from "@mui/material"
import { BasketItem } from "../../models"
import { Order } from "../../models/order"
import BasketTable from "../basket/BasketTable"
import BasketSummary from "../../components/BasketSummary"

interface Props {
  order: Order
  setSelectorOrder: (id: number) => void
}

export default function OrderDetails({ order, setSelectorOrder }: Props) {
  const orderDetailsSubtotal = order.orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
          Order#{order.id} - {order.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectorOrder(0)}
          sx={{ mb: 2, mr: 2 }}
          size="large"
          variant="contained"
        >
          Back to Orders
        </Button>
      </Box>
      <BasketTable isBasket={false} items={order.orderItems as BasketItem[]} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary orderDetailsSubtotal={orderDetailsSubtotal} />
        </Grid>
      </Grid>
    </>
  )
}
