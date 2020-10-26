import { Request, Response, NextFunction } from 'express'

import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

const getUser = async (request: Request, response: Response, next: NextFunction) => {
  const { accessToken } = response.locals

  try {
    const { data } = await SDK(Method.GET, '/user', accessToken)
    response.locals.userData = data

    next()
  } catch (error) {
    response.status(403).send({ message: 'Forbidden Resource', status: 403 })
  }
}

export default getUser
