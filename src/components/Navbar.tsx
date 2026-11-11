import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const closeSession = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link to="/flights" className="logo">Fly Away</Link>

      <nav>
        <Link to="/flights">Vuelos</Link>

        {user && <Link to="/my-bookings">Mis reservas</Link>}

        {user ? (
          <>
            <span>{user.firstName} {user.lastName}</span>
            <button onClick={closeSession} className="linkButton">Cerrar sesion</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </nav>
    </header>
  )
}
