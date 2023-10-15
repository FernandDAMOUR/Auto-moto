import express from 'express'
import controller from '~/controllers/comment'
import { authenticateUser } from '~/middlewares/authMiddleware'

const router = express.Router()

router.get('/get/all', controller.getAllComments)
router.get('/get/:id', controller.getComment)
router.use(authenticateUser)
router.post('/create', controller.createComment)
router.put('/update/:id', controller.updateComment)
router.delete('/delete/:id', controller.deleteComment)

export default router
