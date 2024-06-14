import { List } from "@mui/material"
import { Product } from "../models"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <List>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </List>
  )
}
