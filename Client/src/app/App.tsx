import { useEffect, useState } from "react"
import Catalog from "../components/Catalog"
import { Product } from "../models"
import Typography from "@mui/material/Typography"

function App() {
  const [products, setProducts] = useState<Product[]>([])

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
        pictureUrl: "https://picsum.photos/200",
      },
    ])
  }

  return (
    <div>
      <Typography variant="h1">Catalog</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  )
}

export default App
