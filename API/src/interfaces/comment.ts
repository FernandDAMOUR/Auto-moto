import { Document, Schema } from 'mongoose'

export default interface IComment extends Document {
  id: string
  content: string
  rating: number
  formation_Id: { type: Schema.Types.ObjectId; ref: 'Formation' }
  user_Id: { type: Schema.Types.ObjectId; ref: 'User' }
}
