import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getBooking } from '../services/flightService'
import type { Booking } from '../types'
import { getBookingIds } from '../utils/bookingsStorage'

export default function MyBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!user) return

      const ids = getBookingIds(user.email)
      const results = await Promise.allSettled(ids.map((id) => getBooking(id)))
      const values = results
        .filter((result): result is PromiseFulfilledResult<Booking> => result.status === 'fulfilled')
        .map((result) => result.value)

      setBookings(values)
      setLoading(false)
    }

    load()
  }, [user])

  return (
    <main className="page">
      <div className="pageTitle">
        <p className="smallTitle">TU HISTORIAL</p>
        <h1>Mis reservas</h1>
      </div>

      {loading && <p className="message">Cargando reservas...</p>}

      {!loading && bookings.length === 0 && (
        <p className="empty">Todavia no tienes reservas guardadas.</p>
      )}

      <div className="bookingList">
        {bookings.map((booking) => (
          <article className="card bookingCard" key={booking.id}>
            <span>Reserva #{booking.id}</span>
            <h2>{booking.flightNumber}</h2>
            <p>{booking.airlineName}</p>
            <p>Salida: {new Date(booking.estDepartureTime).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
