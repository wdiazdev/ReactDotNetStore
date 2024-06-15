import { Grid } from "@mui/material"
import { Product } from "../models"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item md={3} key={product.id}>
          <ProductCard key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
