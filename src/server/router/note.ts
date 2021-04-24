import express from 'express'

import noteHandler from '../handlers/note'
import checkAuth from '../middleware/checkAuth'
import getUser from '../middleware/getUser'

const router = express.Router()

router.post('/download', noteHandler.download)
router.post('/health', (req, res) => {
  res.send(200)
})

export default router
