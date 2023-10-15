import { Document } from 'mongoose'

export default interface IFormation extends Document {
  id: string
  title: string
  description: string
  price: number
}
