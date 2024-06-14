import { useEffect, useState } from "react"
import Catalog from "../components/Catalog"
import { ProductsData } from "../models"
// import useGetProducts from "../hooks/useGetProducts"

function App() {
  const [products, setProducts] = useState<ProductsData[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "Test brand",
        description: "Test description",
        pictureUrl: "http//picsum.photos/200",
      },
    ])
  }

  return (
    <div>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  )
}

export default App
