import express from 'express'
import * as dotenv from 'dotenv'

import authHandler from '../handlers/auth'
import mockAuthHandler from '../handlers/mock/mockAuth'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()
dotenv.config()

const isTest = process.env.TEST_ENV

if (isTest) {
  // Mocked routes for Cypress end-to-end tests
  router.get('/callback', mockAuthHandler.callback)
  router.get('/authenticate', mockAuthHandler.authenticate)
} else {
  // Real routes
  router.get('/callback', authHandler.callback)
  router.get('/authenticate', checkAuth, authHandler.authenticate)
}

export default router
