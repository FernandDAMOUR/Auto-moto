import mongoose, { Schema } from 'mongoose'
import { ICart } from '~/interfaces/cart'

// Définissez le schéma du panier
export const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
})

export default mongoose.model<ICart>('Cart', CartSchema)
