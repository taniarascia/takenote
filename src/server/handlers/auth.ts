import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const isProduction = process.env.NODE_ENV === 'production'

const oneHourCookie = {
  maxAge: 60 * 60 * 1000,
  secure: isProduction,
  httpOnly: true,
  sameSite: true,
}

export default {
  callback: async (request: Request, response: Response) => {
    const requestToken = request.query.code

    const { data } = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    })

    const accessToken = data.access_token

    response.cookie('accessToken_GitHub', accessToken, oneHourCookie)
    response.redirect('/app')
  },
}
