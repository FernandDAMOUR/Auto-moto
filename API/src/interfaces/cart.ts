import mongoose, { Document } from 'mongoose'
import IUser from './user'

// Créez l'interface pour le modèle
export interface ICart extends Document {
  user: IUser['_id']
  items: { formation: mongoose.Types.ObjectId; quantity: number }[]
}
