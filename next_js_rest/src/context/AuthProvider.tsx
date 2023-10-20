// AuthContext.tsx
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

// Créez une interface pour décrire le contenu du contexte d'authentification
interface AuthContextType {
  token: string
  userName: string // Ajoutez une propriété pour le nom de l'utilisateur
  login: (newToken: string, newUserName: string) => void // Mettez à jour la signature de login
  logout: () => void
}

// Créez un contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Créez un composant contexte pour fournir le contexte d'authentification à toute l'application
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUserName = localStorage.getItem('userName') // Chargez le nom de l'utilisateur

    if (typeof window !== 'undefined' && storedToken) {
      setToken(storedToken)
      setUserName(storedUserName || '') // Utilisez le nom de l'utilisateur stocké ou une chaîne vide
    }
  }, [])
  const login = (newToken: string, newUserName: string) => {
    // Ajoutez le nom de l'utilisateur comme paramètre
    setToken(newToken)
    setUserName(newUserName) // Stockez le nom de l'utilisateur

    // Stockez le token et le nom de l'utilisateur côté client uniquement
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken)
      localStorage.setItem('userName', newUserName) // Stockez le nom de l'utilisateur
    }
  }
  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
  }

  return <AuthContext.Provider value={{ token, login, userName, logout }}>{children}</AuthContext.Provider>
}

// Créez un hook personnalisé pour accéder au contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
