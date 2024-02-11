export function formatTime(dateValue: string) {
  const now = new Date()
  const date = new Date(dateValue)

  const diff = Math.round((now.getTime() - date.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

  if (Math.abs(diff) < 60) {
    return rtf.format(-diff, 'second')
  } else if (Math.abs(diff) < 3600) {
    const minutes = Math.floor(diff / 60)
    if (minutes === 0) {
      return ''
    } else {
      return `${rtf.format(-minutes, 'minute')}`
    }
  } else if (Math.abs(diff) < 86400) {
    const hours = Math.floor(diff / 3600)
    const remainingMinutes = Math.floor((diff % 3600) / 60)
    if (remainingMinutes === 0) {
      return `${rtf.format(-hours, 'hour')}`
    } else {
      return `${rtf.format(-hours, 'hour')} e ${rtf.format(-remainingMinutes, 'minute').replace('há ', '')}`
    }
  } else {
    const days = Math.floor(diff / 86400)
    return rtf.format(-days, 'day')
  }
}
