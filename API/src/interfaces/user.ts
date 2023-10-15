import { Document } from 'mongoose'

export default interface IUser extends Document {
  id: string
  name: string
  email: string
  password: string
  age: number
  role: boolean
  address: string
  permisObtenues: Permis
}

export interface Permis {
  a1: boolean
  a2: boolean
  a: boolean
  b1: boolean
  b: boolean
}
