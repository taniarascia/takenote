import { Request, Response, NextFunction } from 'express'

export default {
  callback: async (request: Request, response: Response) => {
    response.redirect('/app')
  },

  authenticate: async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send({ name: 'Test User', email: 'email@example.com' })
  },
}
