import { useEffect, useState } from 'react'
import FlightTable from '../components/FlightTable'
import SearchForm from '../components/SearchForm'
import { useAuth } from '../context/AuthContext'
import { bookFlight, getBooking, searchFlights } from '../services/flightService'
import type { Booking, Flight, SearchValues } from '../types'
import { errorMessage } from '../utils/apiError'
import { saveBookingId } from '../utils/bookingsStorage'

export default function Flights() {
  const { user } = useAuth()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingId, setBookingId] = useState<number | null>(null)
  const [lastBooking, setLastBooking] = useState<Booking | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const search = async (values: SearchValues = {}) => {
    setError('')
    setLoading(true)

    try {
      const data = await searchFlights(values)
      setFlights(data)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchFlights({})
      .then((data) => setFlights(data))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false))
  }, [])

  const reserve = async (flight: Flight) => {
    if (!user) return

    setError('')
    setMessage('')
    setBookingId(flight.id)

    try {
      const data = await bookFlight(flight.id)
      saveBookingId(user.email, data.id)

      const detail = await getBooking(data.id)
      setLastBooking(detail)
      setMessage(`Reserva creada correctamente. ID: ${data.id}`)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBookingId(null)
    }
  }

  return (
    <main className="page">
      <div className="pageTitle">
        <p className="smallTitle">ENCUENTRA TU PROXIMO DESTINO</p>
        <h1>Buscar vuelos</h1>
        <p>Busca por numero, aerolinea o rango de fechas.</p>
      </div>

      <SearchForm onSearch={search} loading={loading} />

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {lastBooking && (
        <section className="bookingDetail">
          <h2>Detalle de la ultima reserva</h2>
          <p><b>{lastBooking.flightNumber}</b> - {lastBooking.airlineName}</p>
          <p>Salida: {new Date(lastBooking.estDepartureTime).toLocaleString()}</p>
          <p>Pasajero: {lastBooking.customerFirstName} {lastBooking.customerLastName}</p>
        </section>
      )}

      {loading ? <p className="message">Cargando vuelos...</p> : (
        <FlightTable flights={flights} canBook={Boolean(user)} onBook={reserve} bookingId={bookingId} />
      )}
    </main>
  )
}
