import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../models"
import agent from "../api/agent"
import { RootState } from "./configureStore"

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async () => {
    try {
      return await agent.Catalog.list()
    } catch (error) {
      console.log("error:", error)
    }
  },
)

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchSingleProductAsync",
  async (productId) => {
    try {
      return await agent.Catalog.details(productId)
    } catch (error) {
      console.log("error:", error)
    }
  },
)

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts"
    })
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload)
      state.status = "idle"
      state.productsLoaded = true
    })
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle"
    })
    builder.addCase(fetchSingleProductAsync.pending, (state) => {
      state.status = "pendingFetchSingleProduct"
    })
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload)
      state.status = "idle"
    })
    builder.addCase(fetchSingleProductAsync.rejected, (state) => {
      state.status = "idle"
    })
  },
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)
