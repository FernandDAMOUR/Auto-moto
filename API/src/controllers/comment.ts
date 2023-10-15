import Comment from '~/models/comment'
import { Response, Request } from 'express'
import mongoose from 'mongoose'

export const createComment = async (req: Request, res: Response) => {
  const { content, rating, formationId, userId } = req.body
  const comment = new Comment({
    id: new mongoose.Types.ObjectId(),
    content,
    rating,
    formationId: new mongoose.Types.ObjectId(formationId),
    userId: new mongoose.Types.ObjectId(userId)
  })
  await comment.save()
  return res.status(201).json({
    message: 'Comment created',
    comment
  })
}

export const getAllComments = async (req: Request, res: Response) => {
  await Comment.find()
    .then((comments) => {
      return res.status(200).json({
        message: `${comments.length} comments found`,
        comments
      })
    })
    .catch((error) => {
      return res.status(500).json({ message: 'Error while fetching comments', error: error.message })
    })
}

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params
  await Comment.findById(id).then((comment) => {
    try {
      if (comment) {
        return res.status(200).json({
          message: `Comment found ${comment.content}`,
          comment
        })
      }
      return res.status(404).json({
        message: 'Comment not found'
      })
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Error while fetching comment'
      })
    }
  })
}

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content, rating, userId, formationId } = req.body
  await Comment.findByIdAndUpdate(id, { content, rating, userId, formationId }, { new: true }).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      })
    }
    return res.status(200).json({
      comment,
      message: `Comment ${comment.content} updated`
    })
  })
}

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params
  await Comment.findByIdAndDelete(id).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      })
    }
    return res.status(200).json({
      comment,
      message: `Comment ${comment.content} deleted`
    })
  })
}

export default { createComment, getAllComments, getComment, updateComment, deleteComment }
