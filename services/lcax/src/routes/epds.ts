import { Router } from 'express'
import * as epdsController from '@/controllers/epds'

const router = Router()

router.get('/:epdId', epdsController.getEpd)

export default router
