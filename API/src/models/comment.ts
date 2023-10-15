import mongoose, { Schema } from 'mongoose'
import IComment from '~/interfaces/comment'

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    formation: { type: Schema.Types.ObjectId, ref: 'Formation' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IComment>('Comment', CommentSchema)
