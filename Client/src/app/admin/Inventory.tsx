import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { currencyFormat } from "../utils/utils"
import useProducts from "../hook/useProducts"
import AppPagination from "../../components/AppPagination"
import { useAppDispatch, useAppSelector } from "../store/configureStore"
import { setPageNumber } from "../store/catalogSlice"
import Loader from "../../components/Loader"
import { useState } from "react"
import ProductForm from "./ProductForm"
import { Product } from "../../models"

export default function Inventory() {
  const [editMode, setEditMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const { status } = useAppSelector((state) => state.catalog)
  const { products, metaData } = useProducts()

  const dispatch = useAppDispatch()

  if (status === "pendingFetchProducts") return <Loader message="Loading products" />

  const handleSelectedProduct = (product: Product) => {
    setSelectedProduct(product)
    setEditMode(true)
  }

  const handleCancelEdit = () => {
    if (selectedProduct) setSelectedProduct(undefined)
    setEditMode(false)
  }

  if (editMode) return <ProductForm cancelEdit={handleCancelEdit} product={selectedProduct} />

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button sx={{ m: 2 }} size="large" variant="contained" onClick={() => setEditMode(true)}>
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button startIcon={<Edit />} onClick={() => handleSelectedProduct(product)} />
                  <Button startIcon={<Delete />} color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />
        </Box>
      )}
    </>
  )
}
