import axios from 'axios'

export function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail ?? 'Error de conexion con el servidor'
  }

  return 'Ocurrio un error inesperado'
}
