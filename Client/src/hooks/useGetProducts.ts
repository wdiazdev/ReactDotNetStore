import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { ProductsData } from "../models"

export default function useGetProducts(): {
  getProducts: UseQueryResult<{
    success: boolean
    statusCode: number
    message: string
    data: ProductsData[] | undefined
  }>
} {
  return {
    getProducts: useQuery({
      queryKey: ["GetProducts"],
      queryFn: async () => {
        const response = await fetch(`http://localhost:5000/api/products`)

        const data = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }

        return data
      },
    }),
  }
}
