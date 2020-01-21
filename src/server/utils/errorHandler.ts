import { Request, Response, NextFunction } from 'express'

interface Error {
  statusCode: number
}

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(error)
  }

  response.status(error.statusCode).send(error)
}

export default errorHandler
