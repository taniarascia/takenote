import express from 'express'
import * as dotenv from 'dotenv'

import syncHandler from '../handlers/sync'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()
dotenv.config()

router.get('/sync', checkAuth, syncHandler.sync)

export default router
