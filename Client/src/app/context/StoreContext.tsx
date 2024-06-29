import { PropsWithChildren, createContext, useContext, useState } from "react"
import { Basket } from "../../models"

interface StoreContextValue {
  basket: Basket | null
  setBasket: (basket: Basket) => void
  removeItem: (productId: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error("Oops, no store context")
  }

  return context
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<Basket | null>(null)

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return
    const items = [...basket.items]
    const itemIndex = items.findIndex((i) => i.productId === productId)
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1)
      setBasket((prev) => {
        return {
          ...prev!,
          items,
        }
      })
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  )
}
