import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { errorMessage } from '../utils/apiError'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email || !firstName || !lastName || !password) {
      setError('Completa todos los campos')
      return
    }

    try {
      setLoading(true)
      await registerUser({ email, firstName, lastName, password })
      navigate('/login', { state: { message: 'Usuario registrado correctamente' } })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="authPage">
      <form onSubmit={submit} className="card authCard">
        <p className="smallTitle">CREAR CUENTA</p>
        <h1>Registro</h1>

        {error && <p className="error">{error}</p>}

        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Nombre<input value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label>
        <label>Apellido<input value={lastName} onChange={(event) => setLastName(event.target.value)} /></label>
        <label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>

        <button disabled={loading}>{loading ? 'Registrando...' : 'Registrarme'}</button>
        <p className="formLink">Ya tienes cuenta? <Link to="/login">Inicia sesion</Link></p>
      </form>
    </main>
  )
}
