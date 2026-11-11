export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

export type Flight = {
  id: number
  airlineName: string
  flightNumber: string
  estDepartureTime: string
  estArrivalTime: string
  availableSeats: number
}

export type Booking = {
  id: number
  bookingDate: string
  flightId: number
  flightNumber: string
  airlineName: string
  estDepartureTime: string
  estArrivalTime: string
  customerId: number
  customerFirstName: string
  customerLastName: string
}

export type SearchValues = {
  flightNumber?: string
  airlineName?: string
  estDepartureTimeFrom?: string
  estDepartureTimeTo?: string
}
