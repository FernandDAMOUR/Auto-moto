import express from 'express'
import * as controller from '~/controllers/user'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.use(authenticateUser) // Middleware d'authentification pour les routes suivantes
router.get('/get/all', controller.getAllUsers)
router.get('/get/:id', controller.getUser)
router.put('/update/:id', controller.updateUser)
router.delete('/delete/:id', controller.deleteUser)

export default router
