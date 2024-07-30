import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AddressForm from "./AddressForm"
import Review from "./Review"
import PaymentForm from "./PaymentForm"
import { validationSchema } from "./CheckoutValidation"
import agent from "../../app/api/agent"
import { useAppDispatch } from "../../app/store/configureStore"
import { clearBasket } from "../../app/store/basketSlice"
import { LoadingButton } from "@mui/lab"
import { StripeElementType } from "@stripe/stripe-js"
import { StripeCardType } from "../../models/payment"

const steps = ["Shipping address", "Review your order", "Payment details"]

export default function Checkout() {
  const dispatch = useAppDispatch()

  const [activeStep, setActiveStep] = useState(0)
  const currentValidationSchema = validationSchema[activeStep]

  const [orderNumber, setOrderNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const [cardState, setCardState] = useState<{
    elementError: { [key in StripeElementType]?: string }
  }>({ elementError: {} })

  const [cardComplete, setCardComplete] = useState<StripeCardType>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  })

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  })

  useEffect(() => {
    agent.Account.fetchSavedAddress()
      .then((response) => {
        if (response) {
          methods.reset({ ...methods.getValues(), ...response, savedAddress: false })
        }
      })
      .catch((error) => console.log(error))
  }, [methods])

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setIsDisabled(
        !cardComplete.cardCvc ||
          !cardComplete.cardExpiry ||
          !cardComplete.cardNumber ||
          !methods.formState.isValid,
      )
    } else {
      setIsDisabled(!methods.formState.isValid)
    }
  }, [
    activeStep,
    cardComplete.cardCvc,
    cardComplete.cardNumber,
    cardComplete.cardExpiry,
    methods.formState.isValid,
  ])

  const onCardInputChange = (event: any) => {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    })
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete })
  }

  const handleNext = async (data: FieldValues) => {
    const { nameOnCard, saveAddress, ...shippingAddress } = data
    if (activeStep === steps.length - 1) {
      setLoading(true)
      try {
        const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress })
        setOrderNumber(orderNumber)
        setActiveStep(activeStep + 1)
        dispatch(clearBasket())
        setLoading(false)
      } catch (error) {
        console.log("error:", error)
      }
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />
      case 1:
        return <Review />
      case 2:
        return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />
      default:
        throw new Error("Unknown step")
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We have emailed your order confirmation, and
                will send you an update when your order has shipped.
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  loading={loading}
                  disabled={isDisabled}
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  )
}
