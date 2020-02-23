import { Request, Response } from 'express'

export default {
  callback: async (request: Request, response: Response) => {
    response.redirect('/app')
  },

  login: async (request: Request, response: Response) => {
    response.status(200).send({ name: 'Test User', email: 'email@example.com' })
  },

  logout: async (request: Request, response: Response) => {
    response.status(200).send({ message: 'Logged out' })
  },
}
