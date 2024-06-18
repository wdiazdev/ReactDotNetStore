import agent from "../app/api/agent"
import ProductList from "../components/ProductList"
import { Product } from "../models"
import { useEffect, useState } from "react"

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    agent.Catalog.list()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <ProductList products={products} />
    </>
  )
}
