import Catalog from "../components/Catalog"
import useGetProducts from "../hooks/useGetProducts"

function App() {
  const { getProducts } = useGetProducts()

  const { data: productsResponseData } = getProducts

  const { data: productsData } = productsResponseData ?? {}

  return (
    <div>
      <Catalog products={productsData} />
    </div>
  )
}

export default App
