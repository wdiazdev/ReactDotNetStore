import { fetchFilters, fetchProductsAsync, productSelectors } from "../app/store/catalogSlice"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"
import Loader from "../components/Loader"
import ProductList from "../components/ProductList"
import { useEffect } from "react"

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status, filtersLoaded } = useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters())
  }, [dispatch, filtersLoaded])

  if (status.includes("pending")) return <Loader message="Loading products..." />

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
