import express from 'express'
import * as dotenv from 'dotenv'

import authHandler from '../handlers/auth'
import mockAuthHandler from '../handlers/mock/mockAuth'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()
dotenv.config()

const isTest = process.env.TEST_ENV

if (!isTest) {
  // Real routes
  router.get('/callback', authHandler.callback)
  router.get('/login', checkAuth, authHandler.login)
  router.get('/logout', authHandler.logout)
} else {
  // Mocked routes for Cypress end-to-end tests
  router.get('/callback', mockAuthHandler.callback)
  router.get('/login', mockAuthHandler.login)
  router.get('/logout', mockAuthHandler.logout)
}

export default router
