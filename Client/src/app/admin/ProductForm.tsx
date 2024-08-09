import { Typography, Grid, Paper, Box, Button } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import AppTextInput from "../../components/AppTextInput"
import { Product } from "../../models"
import { useEffect } from "react"
import useProducts from "../hook/useProducts"
import SelectList from "../../components/SelectList"
import Dropzone from "../../components/Dropzone"

interface Props {
  product?: Product
  cancelEdit: () => void
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const { brands, types } = useProducts()
  const { control, reset, handleSubmit, watch } = useForm()

  const watchFile = watch("file", null)

  useEffect(() => {
    if (product) reset(product)
  }, [product, reset])

  const handleFormSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectList control={control} name="brand" label="Brand" items={brands} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectList control={control} name="type" label="Type" items={types} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="price" label="Price" type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="description"
              label="Description"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Dropzone control={control} name="file" />
              {watchFile ? (
                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
              ) : (
                <img src={product?.pictureUrl} alt={product?.name} style={{ maxHeight: 200 }} />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}
