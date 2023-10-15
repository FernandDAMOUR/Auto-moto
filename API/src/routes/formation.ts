import express from 'express'
import * as controller from '~/controllers/formation'
import { authenticateUser } from '~/middlewares/authMiddleware'

const router = express.Router()

router.get('/get/all', controller.getAllFormations)
router.get('/get/:id', controller.getFormation)
router.use(authenticateUser)
router.post('/create', controller.createFormation)
router.put('/update/:id', controller.updateFormation)
router.delete('/delete/:id', controller.deleteFormation)

export default router
