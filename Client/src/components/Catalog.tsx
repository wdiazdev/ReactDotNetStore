import { ProductsData } from "../models"

type Props = {
  products: ProductsData[]
  addProduct: () => void
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <h2>Catalog</h2>
      <div>
        {products && products.length > 0 && (
          <ol>
            {products.map((product: any) => (
              <li key={product.id}>
                <p>{product.name}</p>
              </li>
            ))}
          </ol>
        )}
        <button onClick={addProduct}>Add</button>
      </div>
    </>
  )
}
