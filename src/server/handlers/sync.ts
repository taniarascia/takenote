import { Request, Response } from 'express'

import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

export default {
  sync: async (request: Request, response: Response) => {
    const { accessToken, userData } = response.locals
    const { body } = request
    const username = userData.login

    console.log(body)

    response.status(200).send({ message: 'Success' })

    try {
    } catch (error) {
      console.log(error)
      response.status(400).send({ message: 'Error' })
    }
  },
}
