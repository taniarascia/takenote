import path from 'path'

import express, { Request, Response, Router } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

export default function initializeServer(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  app.set('trust proxy', 1)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(cors(origin))
  app.use(helmet())
  app.use(compression())

  app.use(express.static(path.join(__dirname, '../../dist/')))
  app.use('/api', router)
  app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '../../dist/index.html'))
  })

  return app
}
