import { Grid, Paper } from "@mui/material"
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "../app/store/catalogSlice"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"
import Loader from "../components/Loader"
import ProductList from "../components/ProductList"
import { useEffect } from "react"
import ProductSearch from "../components/ProductSearch"
import RadioButtonGroup from "../components/RadioButtonGroup"
import CheckboxButtons from "../components/CheckboxButtons"
import AppPagination from "../components/AppPagination"

const sortOptions = [
  { value: "name", label: "A-Z" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "priceAsc", label: "Price - Low to high" },
]

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } =
    useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters())
  }, [dispatch, filtersLoaded])

  if (!filtersLoaded) return <Loader message="Loading products..." />

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />
        )}
      </Grid>
    </Grid>
  )
}
