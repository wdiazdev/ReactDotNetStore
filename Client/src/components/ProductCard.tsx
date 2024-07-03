import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material"
import { Product } from "../models"
import { Link } from "react-router-dom"
import agent from "../app/api/agent"
import { useState } from "react"
import { LoadingButton } from "@mui/lab"
import { useAppDispatch } from "../app/store/configureStore"
import { setBasket } from "../app/store/basketSlice"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddItem = () => {
    setIsLoading(true)
    agent.Basket.addItem(product.id)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "secondary.main",
            }}
          >
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
          },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          onClick={handleAddItem}
          loading={isLoading}
          sx={{ color: "primary" }}
        >
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  )
}
