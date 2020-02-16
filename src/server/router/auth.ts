import express from 'express'

import authHandler from '../handlers/auth'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.get('/callback', authHandler.callback)
router.get('/authenticate', checkAuth, authHandler.authenticate)

export default router
