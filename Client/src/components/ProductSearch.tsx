import { TextField, debounce } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"
import { setProductParams } from "../app/store/catalogSlice"
import { useState, useEffect, useCallback } from "react"

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()

  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(setProductParams({ searchTerm: searchValue }))
    }, 1000),
    [],
  )

  useEffect(() => {
    return () => {
      debouncedSearch.clear()
    }
  }, [debouncedSearch])

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value)
        debouncedSearch(event.target.value)
      }}
    />
  )
}
