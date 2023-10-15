import mongoose, { Schema } from 'mongoose'
import IFormation from '~/interfaces/formation'

const FormationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IFormation>('Formation', FormationSchema)
