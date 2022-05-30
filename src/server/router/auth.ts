import express from 'express'
import * as dotenv from 'dotenv'

const router = express.Router()
dotenv.config()

router.get('/callback', () => {})
router.get(
  '/login',
  () => {},
  () => {}
)
router.get('/logout', () => {})

export default router
