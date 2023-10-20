import axios from 'axios'

export const createApiInstance = () => {
  const isBrowser = typeof window !== 'undefined'
  let token = null

  if (isBrowser) {
    token = localStorage.getItem('token')
  }

  const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 10000,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    }
  })

  // Vérifie si un token a été trouvé dans localStorage (uniquement côté client)
  if (isBrowser && token) {
    // Ajoute l'autorisation au header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return api
}

export const api = createApiInstance()
