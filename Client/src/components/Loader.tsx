import { Backdrop, Box, CircularProgress, Typography, TypographyProps } from "@mui/material"
import { useMemo } from "react"

type Props = {
  message?: string
  size?: "small" | "medium" | "large"
}

type SizeStyles = {
  loaderSize: number
  textVariant: TypographyProps["variant"]
  textTop: string
}

export default function Loader({ message = "Loading...", size = "medium" }: Props) {
  const styles: SizeStyles = useMemo(() => {
    const sizeMap: Record<typeof size, SizeStyles> = {
      small: { loaderSize: 26, textVariant: "h6", textTop: "52%" },
      medium: { loaderSize: 50, textVariant: "h5", textTop: "54%" },
      large: { loaderSize: 100, textVariant: "h4", textTop: "58%" },
    }
    return sizeMap[size] || sizeMap.medium
  }, [size])

  return (
    <Backdrop open={true} invisible={true}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={styles.loaderSize} color="secondary" />
        <Typography
          variant={styles.textVariant}
          sx={{ justifyContent: "center", position: "fixed", top: styles.textTop }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  )
}
