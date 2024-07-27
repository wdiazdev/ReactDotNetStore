export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
  return b ? b.pop() : ""
}

export function currencyFormat(amount: number) {
  return (
    "$" +
    (amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  )
}
