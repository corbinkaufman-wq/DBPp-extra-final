import { useState, type FormEvent } from 'react'
import type { SearchValues } from '../types'

export default function SearchForm({ onSearch, loading }: {
  onSearch: (values: SearchValues) => void
  loading: boolean
}) {
  const [flightNumber, setFlightNumber] = useState('')
  const [airlineName, setAirlineName] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()

    onSearch({
      flightNumber,
      airlineName,
      estDepartureTimeFrom: from,
      estDepartureTimeTo: to,
    })
  }

  return (
    <form onSubmit={submit} className="searchForm">
      <label>
        Numero de vuelo
        <input value={flightNumber} onChange={(event) => setFlightNumber(event.target.value)} placeholder="LA101" />
      </label>

      <label>
        Aerolinea
        <input value={airlineName} onChange={(event) => setAirlineName(event.target.value)} placeholder="LATAM" />
      </label>

      <label>
        Salida desde
        <input type="datetime-local" value={from} onChange={(event) => setFrom(event.target.value)} />
      </label>

      <label>
        Salida hasta
        <input type="datetime-local" value={to} onChange={(event) => setTo(event.target.value)} />
      </label>

      <button disabled={loading}>{loading ? 'Buscando...' : 'Buscar vuelos'}</button>
    </form>
  )
}
