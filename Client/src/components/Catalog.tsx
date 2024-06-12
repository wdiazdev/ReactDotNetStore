import { ProductsData } from "../models"

type Props = {
  products: ProductsData[] | undefined
}

export default function Catalog({ products }: Props) {
  return (
    <>
      <h2>Catalog</h2>
      <div>
        {products && products.length > 0 && (
          <ol>
            {products.map((product) => (
              <li key={product.id}>
                <p>{product.name}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  )
}
