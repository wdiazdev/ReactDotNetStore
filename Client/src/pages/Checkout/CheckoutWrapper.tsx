import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from "./Checkout"
import { useEffect, useState } from "react"
import agent from "../../app/api/agent"
import { useAppDispatch } from "../../app/store/configureStore"
import { setBasket } from "../../app/store/basketSlice"
import Loader from "../../components/Loader"

const stripePromise = loadStripe(
  "pk_test_51PhGKxDFOlsEJFO7FS3ka6HrksbbDHcQ5rqlKBu1zUMXscHxKNuPKUBkiWh410HNSh2H35qHLySy9OG5gCe9Y9Az004S56frKF",
)

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [dispatch])

  if (isLoading) return <Loader message="Loading checkout..." />

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  )
}
