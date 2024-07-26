import { Grid, Typography } from "@mui/material"
import BasketTable from "../basket/BasketTable"
import { useAppSelector } from "../../app/store/configureStore"
import BasketSummary from "../../components/BasketSummary"

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket)

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable isBasket={false} items={basket.items} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  )
}
