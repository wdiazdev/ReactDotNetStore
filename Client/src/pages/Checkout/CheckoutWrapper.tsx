import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from "./Checkout"

const stripePromise = loadStripe(
  "pk_test_51PhGKxDFOlsEJFO7FS3ka6HrksbbDHcQ5rqlKBu1zUMXscHxKNuPKUBkiWh410HNSh2H35qHLySy9OG5gCe9Y9Az004S56frKF",
)

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  )
}
