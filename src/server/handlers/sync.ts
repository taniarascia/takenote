import { Request, Response } from 'express'
import * as dotenv from 'dotenv'

// import { SDK } from '../utils/helpers'
// import { Method } from '../utils/enums'

dotenv.config()

export default {
  sync: async (request: Request, response: Response) => {
    const { accessToken } = response.locals

    try {
    } catch (error) {
      response.redirect('/')
    }
  },
}
