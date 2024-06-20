import agent from "../app/api/agent"
import Loader from "../components/Loader"
import ProductList from "../components/ProductList"
import { Product } from "../models"
import { useEffect, useState } from "react"

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    agent.Catalog.list()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loader message="Loading products..." />

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
