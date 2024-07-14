import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Product, ProductParams } from "../../models"
import agent from "../api/agent"
import { RootState } from "./configureStore"
import { MetaData } from "../../models/pagination"

interface CatalogState {
  productsLoaded: boolean
  filtersLoaded: boolean
  status: string
  brands: string[]
  types: string[]
  productParams: ProductParams
  metaData: MetaData | null
}

const productsAdapter = createEntityAdapter<Product>()

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams()

  params.append("pageNumber", productParams.pageNumber.toString())
  params.append("pageSize", productParams.pageSize.toString())
  params.append("orderBy", productParams.orderBy)
  if (productParams.searchTerm) params.append("searchTerm", productParams.searchTerm)
  if (productParams.brands.length > 0) params.append("brands", productParams.brands.toString())
  if (productParams.types.length > 0) params.append("types", productParams.types.toString())

  return params
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
    try {
      const response = await agent.Catalog.list(params)
      thunkAPI.dispatch(setMetaData(response.metaData))
      return response.items
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchSingleProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
)

export const fetchFilters = createAsyncThunk("catalog/fetchFiltersAsync", async (_, thunkAPI) => {
  try {
    return await agent.Catalog.filters()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

function initParams() {
  return {
    orderBy: "name",
    pageNumber: 1,
    pageSize: 6,
    brands: [],
    types: [],
  }
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false
      state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false
      state.productParams = { ...state.productParams, ...action.payload }
    },
    resetProductParams: (state) => {
      state.productParams = initParams()
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts"
    })
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload)
      state.status = "idle"
      state.productsLoaded = true
    })
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log("action:", action)
      state.status = "idle"
    })
    builder.addCase(fetchSingleProductAsync.pending, (state) => {
      state.status = "pendingFetchSingleProduct"
    })
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload)
      state.status = "idle"
    })
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      console.log("action:", action)
      state.status = "idle"
    })
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters"
    })
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands
      state.types = action.payload.types
      state.filtersLoaded = true
      state.status = "idle"
    })
    builder.addCase(fetchFilters.rejected, (state, action) => {
      console.log("action:", action)
      state.status = "idle"
    })
  },
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } =
  catalogSlice.actions
