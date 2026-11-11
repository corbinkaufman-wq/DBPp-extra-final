import type { Flight } from '../types'

export default function FlightTable({ flights, canBook, onBook, bookingId }: {
  flights: Flight[]
  canBook: boolean
  onBook: (flight: Flight) => void
  bookingId: number | null
}) {
  if (flights.length === 0) {
    return <p className="empty">No encontramos vuelos con esos datos.</p>
  }

  return (
    <div className="tableBox">
      <table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Aerolinea</th>
            <th>Salida</th>
            <th>Llegada</th>
            <th>Asientos</th>
            {canBook && <th></th>}
          </tr>
        </thead>

        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airlineName}</td>
              <td>{new Date(flight.estDepartureTime).toLocaleString()}</td>
              <td>{new Date(flight.estArrivalTime).toLocaleString()}</td>
              <td>{flight.availableSeats}</td>

              {canBook && (
                <td>
                  <button onClick={() => onBook(flight)} disabled={bookingId === flight.id}>
                    {bookingId === flight.id ? 'Reservando...' : 'Reservar'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
