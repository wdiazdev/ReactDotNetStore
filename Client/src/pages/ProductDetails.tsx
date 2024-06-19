import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../models"
import agent from "../app/api/agent"
import NotFound from "../app/api/errors/NotFound"

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    id &&
      agent.Catalog.details(parseInt(id))
        .then((res) => setProduct(res))
        .catch((err) => console.log("Error response: ", err))
        .finally(() => setIsLoading(false))
  }, [id])

  if (!isLoading && !product) return <NotFound />

  return (
    <>
      {isLoading && <Typography variant="h2">Loading...</Typography>}
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
          </Grid>
        </Grid>
      )}
    </>
  )
}
