export function getBookingIds(email: string) {
  const value = localStorage.getItem(`bookings:${email}`)

  return value ? JSON.parse(value) as number[] : []
}

export function saveBookingId(email: string, id: number) {
  const ids = getBookingIds(email)

  localStorage.setItem(`bookings:${email}`, JSON.stringify([...ids, id]))
}
