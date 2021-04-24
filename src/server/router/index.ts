import express from 'express'

import authRoutes from './auth'
import syncRoutes from './sync'
import noteRoutes from './note'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/sync', syncRoutes)
router.use('/note', noteRoutes)

export default router
