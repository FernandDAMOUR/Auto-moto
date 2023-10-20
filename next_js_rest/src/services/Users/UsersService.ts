import { api, createApiInstance } from '../ServiceHelper'
export interface IUser {
  _id?: string
  name?: string
  email?: string
  password?: string
  age?: number
  address?: string
  role?: boolean
  permisObtenues?: string
}

export const getallUsers = async (): Promise<IUser[]> => {
  return await api.get('/users/get/all').then((response) => response.data.users)
}
export const getUser = async (id: string | string[]) => {
  return await api.get('/users/get/' + id).then((response) => response.data.user)
}

export const register = async (IUser: IUser): Promise<IUser[]> => {
  return await api.post('/users/register').then((response) => response.data.user)
}

// export const login = async (email: string, password: string): Promise<void> => {
//   try {
//     const response = await api.post('/users/login', { email, password })
//     const token = response.headers.authorization
//     const user = response.data.user

//     if (token) {
//       login(token, user.name) // Appel de la fonction de connexion avec le token et le nom de l'utilisateur
//       localStorage.setItem('token', token)
//     }
//   } catch (error) {
//     throw error
//   }
// }

// export const login = async (email: string, password: string): Promise<void> => {
//   try {
//     const response = await api.post('/users/login', { email, password })
//     const token = response.headers.authorization
//     const user = response.data.user

//     if (token) {
//       // Vous pouvez appeler la fonction de connexion ici avec le token et le nom de l'utilisateur
//       // login(token, user.name);

//       // Assurez-vous que localStorage.setItem est appelé dans un environnement de navigateur
//       if (typeof localStorage !== 'undefined') {
//         localStorage.setItem('token', token)
//       }
//     }
//   } catch (error) {
//     throw error
//   }
// }

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await api.post('/users/login', { email, password })
    const token = response.data.token // Utilisez response.data.token pour extraire le token

    if (token) {
      // Stockez le token dans le localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', token)
      }
    }
  } catch (error) {
    throw error
  }
}

// export const login = async (email: string, password: string): Promise<IUser> => {
//   try {
//     const response = await api.post('/users/login', { email, password })
//     const token = response.data.token
//     const user = response.data.user
//     console.log(token)

//     if (token) {
//       login(token, user.name)
//       localStorage.setItem('token', token)
//     }
//   } catch (error) {
//     throw error
//   }
// }
export const updateUser = async (IUser: IUser): Promise<IUser[]> => {
  return await api.put('/users/update/' + IUser._id).then((response) => response.data.user)
}

export const deleteUser = async (id: string | string[]): Promise<IUser[]> => {
  return await api.delete('/users/delete/' + id).then((response) => response.data.user)
}
