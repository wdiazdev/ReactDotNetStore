import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { useState, useEffect, ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../models"
import agent from "../app/api/agent"
import NotFound from "../app/api/errors/NotFound"
import Loader from "../components/Loader"
import { LoadingButton } from "@mui/lab"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"
import { addBasketItemAsync, removeBasketItemAsync } from "../app/store/basketSlice"

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(0)

  const item = basket?.items.find((i) => i.productId === product?.id)

  useEffect(() => {
    if (item) setQuantity(item.quantity)
    id &&
      agent.Catalog.details(parseInt(id))
        .then((res) => setProduct(res))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false))
  }, [id, item])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const value = Number(event.target.value)
      if (value >= 0) setQuantity(value)
    }
  }

  const handleUpdateCart = () => {
    const productId = product?.id
    if (!productId) {
      console.log("Product ID is undefined or null")
      return
    }
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity
      dispatch(addBasketItemAsync({ productId, quantity: updatedQuantity }))
    } else {
      const updatedQuantity = item.quantity - quantity
      dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }))
    }
  }

  if (isLoading) return <Loader message="Loading product..." />

  if (!isLoading && !product) return <NotFound />

  return (
    <>
      {product && (
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img src={product?.pictureUrl} alt={product?.name} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product?.name}</Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="h3" color="secondary">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quantity in stock</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  type="number"
                  label="Quantity in Cart"
                  fullWidth
                  value={quantity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  sx={{ height: "55px" }}
                  color="primary"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={handleUpdateCart}
                  loading={status === "pending" + product.id}
                  disabled={item?.quantity === quantity || (!item && quantity === 0)}
                >
                  {item ? "Update Quantity" : "Add to Cart"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}
