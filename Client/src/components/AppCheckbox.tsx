import { Checkbox, FormControlLabel } from "@mui/material"
import { useController, UseControllerProps, useFormContext } from "react-hook-form"

interface Props extends UseControllerProps {
  label: string
}

export default function AppCheckbox(props: Props) {
  const { formState } = useFormContext()
  const { field } = useController({
    ...props,
    defaultValue: false,
  })

  return (
    <FormControlLabel
      label={props.label}
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
          disabled={!formState.isDirty}
        />
      }
    />
  )
}
