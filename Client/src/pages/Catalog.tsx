import ProductList from "../components/ProductList"
import { Product } from "../models"
import { useEffect, useState } from "react"

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])
  return (
    <>
      <ProductList products={products} />
    </>
  )
}
