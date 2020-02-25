import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'

import { thirtyDayCookie } from '../utils/constants'

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export default {
  /**
   * GitHub OAuth flow
   * @url https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
   *
   * 1. When the user hits the `/authorize` endpoint on GitHub, they
   * will be prompted to log in (if not already logged in) and redirected to
   * this `/callback` endpoint with a code.
   *
   * 2. The code will be exchanged for an access token on the `/access_token`
   * endpoint and the user will be redirected to the app.
   *
   * Client-side persistance
   * @url https://www.taniarascia.com/full-stack-cookies-localstorage-react-express/
   *
   * A thirty day, secure, HTTP only, and same-site cookie will be set on the app
   * containing the access token with repo scope for accessing any GitHub data
   * and determining login state.
   *
   * Refresh tokens
   * @url https://developer.github.com/apps/migrating-oauth-apps-to-github-apps/
   *
   * From the GitHub docs:
   * > An OAuth token does not expire until the person who authorized the OAuth
   * > App revokes the token.
   *
   * Therefore, there is no refresh token set up and the only option is to
   * log in again.
   */
  callback: async (request: Request, response: Response) => {
    const { code } = request.query

    try {
      // Obtain access token
      const { data } = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        headers: {
          accept: 'application/json',
        },
      })

      const accessToken = data.access_token

      // Set cookie
      response.cookie('accessTokenGH', accessToken, thirtyDayCookie)

      // Redirect to the app when logged in
      response.redirect('/app')
    } catch (error) {
      console.log(error) // eslint-disable-line
      // Redirect to the main page if something went wrong
      response.redirect('/')
    }
  },

  /**
   * Authentication
   *
   * If an access token cookie exists, attempt to determine the currently logged
   * in user. If the access token is in some way incorrect, expired, etc., throw
   * an error.
   */
  login: async (request: Request, response: Response, next: NextFunction) => {
    const { accessToken } = response.locals

    try {
      const { data } = await axios('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })

      response.status(200).send(data)
    } catch (error) {
      response.status(400).send({ message: error.message })
    }
  },

  logout: async (request: Request, response: Response) => {
    response.clearCookie('accessTokenGH')

    response.status(200).send({ message: 'Logged out' })
  },
}
