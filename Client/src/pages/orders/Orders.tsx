import { useEffect, useState } from "react"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material"
import agent from "../../app/api/agent"
import Loader from "../../components/Loader"
import { Order } from "../../models/order"
import { currencyFormat } from "../../app/utils/utils"
import OrderDetails from "./OrderDetails"

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0)

  useEffect(() => {
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader message="Loading orders..." />

  if (!orders) return <Typography variant="h3">No orders available</Typography>

  if (selectedOrderNumber > 0) {
    const selectedOrder = orders.find((o) => o.id === selectedOrderNumber)
    if (selectedOrder)
      return <OrderDetails order={selectedOrder} setSelectorOrder={setSelectedOrderNumber} />
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order Number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="left">
                  {order.id}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {currencyFormat(order.total)}
                </TableCell>
                <TableCell align="right">{order.orderDate.split("T")[0]}</TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
