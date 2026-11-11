import api from '../api/axios'
import type { User } from '../types'

export async function loginUser(email: string, password: string) {
  const response = await api.post<{ token: string }>('/auth/login', {
    email,
    password,
  })

  return response.data.token
}

export async function getCurrentUser() {
  const response = await api.get<User>('/users/current')

  return response.data
}

export async function registerUser(data: {
  email: string
  firstName: string
  lastName: string
  password: string
}) {
  const response = await api.post<{ id: number }>('/users/register', data)

  return response.data
}
