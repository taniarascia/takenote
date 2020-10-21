import express from 'express'

import syncHandler from '../handlers/sync'
import checkAuth from '../middleware/checkAuth'
import getUser from '../middleware/getUser'

const router = express.Router()

router.post('/', checkAuth, getUser, syncHandler.sync)

export default router
