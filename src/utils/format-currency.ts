export function formatCurrency(amount: number, priceInCents?: boolean) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  if (priceInCents) {
    return formatter.format(amount / 100)
  }

  return formatter.format(amount)
}
