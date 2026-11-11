import api from '../api/axios'
import type { Booking, Flight, SearchValues } from '../types'

export async function searchFlights(values: SearchValues) {
  const params = {
    flightNumber: values.flightNumber || undefined,
    airlineName: values.airlineName || undefined,
    estDepartureTimeFrom: values.estDepartureTimeFrom
      ? new Date(values.estDepartureTimeFrom).toISOString()
      : undefined,
    estDepartureTimeTo: values.estDepartureTimeTo
      ? new Date(values.estDepartureTimeTo).toISOString()
      : undefined,
  }

  const response = await api.get<{ items: Flight[] }>('/flights/search', {
    params,
  })

  return response.data.items
}

export async function bookFlight(flightId: number) {
  const response = await api.post<{ id: number }>('/flights/book', {
    flightId,
  })

  return response.data
}

export async function getBooking(id: number) {
  const response = await api.get<Booking>(`/flights/book/${id}`)

  return response.data
}
