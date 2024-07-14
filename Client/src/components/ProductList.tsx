import { Grid } from "@mui/material"
import { Product } from "../models"
import ProductCard from "./ProductCard"
import { useAppSelector } from "../app/store/configureStore"
import ProductCardSkeleton from "./ProductCardSkeleton"

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog)
  return (
    <Grid container spacing={4}>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <Grid item md={4} key={product.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard key={product.id} product={product} />
            )}
          </Grid>
        ))}
    </Grid>
  )
}
