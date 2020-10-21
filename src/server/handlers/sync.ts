import { Request, Response } from 'express'

import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

export default {
  sync: async (request: Request, response: Response) => {
    const { accessToken, userData } = response.locals
    // https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-or-update-file-contents
    //api.github.com/repos/<owner>/<repository>/contents/<filename.extension>

    response.status(200).send({ message: 'Success' })

    try {
    } catch (error) {
      console.log(error)
      response.status(400).send({ message: 'Error' })
    }
  },
}
