import { Request, Response } from 'express'
import axios from 'axios'
import * as dotenv from 'dotenv'

import { welcomeNote } from '../utils/data/welcomeNote'
import { scratchpadNote } from '../utils/data/scratchpadNote'
import { thirtyDayCookie } from '../utils/constants'
import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

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
   * Client-side persistence
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
      response.cookie('githubAccessToken', accessToken, thirtyDayCookie)

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
   *
   * After successful login, check if it's the first time logging in by seeing if a repo
   * named `takenote-data` exists. If it doesn't, create it.
   */
  login: async (request: Request, response: Response) => {
    const { accessToken } = response.locals

    try {
      const { data } = await SDK(Method.GET, '/user', accessToken)
      const username = data.login

      const isFirstTimeLoggingIn = await firstTimeLoginCheck(username, accessToken)

      if (isFirstTimeLoggingIn) {
        await createTakeNoteDataRepo(username, accessToken)
        await createInitialCommit(username, accessToken)
      }

      response.status(200).send(data)
    } catch (error) {
      response.status(400).send({ message: error.message })
    }
  },

  logout: async (request: Request, response: Response) => {
    response.clearCookie('githubAccessToken')

    response.status(200).send({ message: 'Logged out' })
  },
}

async function firstTimeLoginCheck(username: string, accessToken: string): Promise<boolean> {
  try {
    await SDK(Method.GET, `/repos/${username}/takenote-data`, accessToken)

    // If repo already exists, we assume it's the takenote data repo and can move on
    return false
  } catch (error) {
    // If repo doesn't exist, we'll try to create it
    return true
  }
}

async function createTakeNoteDataRepo(username: string, accessToken: string): Promise<void> {
  const takenoteDataRepo = {
    name: 'takenote-data',
    description: 'Database of notes for TakeNote',
    private: true,
    visibility: 'private',
    has_issues: false,
    has_projects: false,
    has_wiki: false,
    is_template: false,
    auto_init: false,
    allow_squash_merge: false,
    allow_rebase_merge: false,
  }
  try {
    await SDK(Method.POST, `/user/repos`, accessToken, takenoteDataRepo)
  } catch (error) {
    throw new Error(error)
  }
}

async function createInitialCommit(username: string, accessToken: string): Promise<void> {
  const noteCommit = {
    message: 'Initial commit',
    content: Buffer.from(JSON.stringify([scratchpadNote, welcomeNote], null, 2)).toString('base64'),
    branch: 'master',
  }
  try {
    await SDK(
      Method.PUT,
      `/repos/${username}/takenote-data/contents/notes.json`,
      accessToken,
      noteCommit
    )
  } catch (error) {
    throw new Error(error)
  }
}
