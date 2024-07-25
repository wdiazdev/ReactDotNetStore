import { TextField } from "@mui/material"
import { useController, UseControllerProps } from "react-hook-form"

interface Props extends UseControllerProps {
  label: string
  fullWidth: boolean
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" })
  return (
    <TextField
      {...props}
      {...field}
      fullWidth={props.fullWidth}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )
}
