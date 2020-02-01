import express from 'express'

import authHandler from '../handlers/auth'

const router = express.Router()

router.get('/callback', authHandler.callback)

export default router
