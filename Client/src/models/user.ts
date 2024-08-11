import { Basket } from "."

export interface User {
  email: string
  token: string
  basket?: Basket
  roles?: string[]
}
