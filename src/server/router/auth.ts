import express from 'express'
import * as dotenv from 'dotenv'

import authHandler from '../handlers/auth'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()
dotenv.config()

router.get('/callback', authHandler.callback)
router.get('/login', checkAuth, authHandler.login)
router.get('/logout', authHandler.logout)

export default router
