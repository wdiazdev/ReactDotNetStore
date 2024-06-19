import {
  Button,
  Container,
  Typography,
  ButtonGroup,
  Alert,
  AlertTitle,
  List,
  ListItem,
} from "@mui/material"
import agent from "../app/api/agent"
import { useState } from "react"

export default function About() {
  const [validationsErrors, setValidationErrors] = useState<string[]>([])

  const handleValidationError = () => {
    agent.TestErrors.getValidationError().catch((err) => setValidationErrors(err))
  }

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
        <Button variant="contained" onClick={handleValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationsErrors.length > 0 && (
        <Alert severity="error" sx={{ mt: 8 }}>
          <AlertTitle>
            <List>
              {validationsErrors.map((err, index) => (
                <ListItem key={index}>{err}</ListItem>
              ))}
            </List>
          </AlertTitle>
        </Alert>
      )}
    </Container>
  )
}
