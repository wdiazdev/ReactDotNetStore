import { Typography, Grid, TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import AppTextInput from "../../components/AppTextInput"
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js"
import { StripeInput } from "./StripeInput"
import { useState } from "react"
import { StripeElementType } from "@stripe/stripe-js"

interface CardComplete {
  cardNumber: boolean
  cardExpiry: boolean
  cardCvc: boolean
}

export default function PaymentForm() {
  const { control } = useFormContext()

  const [cardState, setCardState] = useState<{
    elementError: { [key in StripeElementType]?: string }
  }>({ elementError: {} })

  const [cardComplete, setCardComplete] = useState<CardComplete>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  })

  const onCardInputChange = (event: any) => {
    console.log("event:", event)
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    })
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="nameOnCard" label="Name on card" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
            }}
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
          />
        </Grid>
      </Grid>
    </>
  )
}
