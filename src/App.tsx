import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Flights from './pages/Flights'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/flights" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flights" element={<Flights />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        <Route path="*" element={<Navigate to="/flights" replace />} />
      </Routes>
    </>
  )
}

export default App
