import { Request, Response } from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'

import { oneHourCookie } from '../utils'

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
   * A one-hour, secure, HTTP only, and same-site cookie will be set on the app
   * containing the access token with repo scope for accessing any GitHub data
   * and determining login state.
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
      response.cookie('accessTokenGitHub', accessToken, oneHourCookie)

      // Redirect to the app when logged in
      response.redirect('/app')
    } catch (error) {
      console.log(error)
      // Redirect to the main page if something went wrong
      response.redirect('/')
    }
  },
}
