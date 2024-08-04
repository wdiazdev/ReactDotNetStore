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
import { Link } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { Product } from "../../models"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { addBasketItemAsync } from "../../app/store/basketSlice"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()

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
          onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
          loading={status === "pendingAddItem" + product.id}
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
