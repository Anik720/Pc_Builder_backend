import express from 'express'
import { PCController } from './pc.controller'

const router = express.Router()

router.post('/', PCController.createPc)

router.get('/:id', PCController.getSinglePc)
router.patch('/:id', PCController.updatePc)
router.delete('/:id', PCController.deletePc)

router.get('/', PCController.getAllPcs)
export const PCRouter = router
