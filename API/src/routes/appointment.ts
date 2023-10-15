import express from 'express'
import * as controller from '~/controllers/appointment'
import { authenticateUser } from '~/middlewares/authMiddleware'

const router = express.Router()

router.use(authenticateUser)
router.get('/get/all', controller.getAllAppointments)
router.get('/get/:id', controller.getAppointment)
router.get('/get/user/:userId', controller.getUserAppointments)
router.post('/create', controller.createAppointment)
router.put('/update/:id', controller.updateAppointment)
router.delete('/delete/:id', controller.deleteAppointment)

export default router
