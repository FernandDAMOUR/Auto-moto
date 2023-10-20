import axios from 'axios'

export const createApiInstance = () => {
  const isBrowser = typeof window !== 'undefined'

  const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 10000,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })

  if (isBrowser) {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  return api
}

export const api = createApiInstance()
