import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { errorMessage } from '../utils/apiError'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to="/flights" replace />
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Completa todos los campos')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      navigate('/flights')
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="authPage">
      <form onSubmit={submit} className="card authCard">
        <p className="smallTitle">BIENVENIDO</p>
        <h1>Login</h1>

        {location.state?.message && <p className="success">{location.state.message}</p>}
        {error && <p className="error">{error}</p>}

        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>

        <button disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        <p className="formLink">No tienes cuenta? <Link to="/register">Registrate</Link></p>
      </form>
    </main>
  )
}
