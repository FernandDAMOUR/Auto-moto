import mongoose, { Schema } from 'mongoose'
import IUser from '~/interfaces/user'

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: Boolean, required: true },
    address: { type: String, required: true },
    permisObtenues: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IUser>('User', UserSchema)
