import { Button, Container, Typography, ButtonGroup } from "@mui/material"
import agent from "../app/api/agent"

export default function About() {
  return (
    <Container>
      <Typography variant="h2">Errors Testing</Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch((err) => console.log(err))}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch((err) => console.log(err))}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch((err) => console.log(err))}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch((err) => console.log(err))}
        >
          Test 500 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationError().catch((err) => console.log(err))}
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  )
}
