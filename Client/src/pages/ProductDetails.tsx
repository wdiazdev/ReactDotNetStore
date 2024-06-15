import { Typography } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../models"

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <Typography variant="h2">Loading...</Typography>
  }
  if (!loading && !product) {
    return <Typography variant="h2">Product not found</Typography>
  }
  return <Typography variant="h2">{product?.name}</Typography>
}
