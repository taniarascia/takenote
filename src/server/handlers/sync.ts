import { Request, Response } from 'express'
import dayjs from 'dayjs'

import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

export default {
  sync: async (request: Request, response: Response) => {
    const { accessToken, userData } = response.locals
    const {
      body: { notes, categories, settings },
    } = request
    const username = userData.login
    const repo = 'takenote-data'

    try {
      // Create blob
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-blob
      const noteBlob = await SDK(Method.POST, `/repos/${username}/${repo}/git/blobs`, accessToken, {
        content: JSON.stringify(notes, null, 2),
      })

      // Create tree
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-tree
      const tree = await SDK(Method.POST, `/repos/${username}/${repo}/git/trees`, accessToken, {
        tree: [{ path: 'notes.json', mode: '100644', type: 'blob', sha: noteBlob.data.sha }],
      })

      // Create commit
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-commit
      const commit = await SDK(Method.POST, `/repos/${username}/${repo}/git/commits`, accessToken, {
        message: 'Notes ' + dayjs(Date.now()).format('h:mm A M/D/YYYY'),
        tree: tree.data.sha,
      })

      // Update a reference
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#update-a-reference
      await SDK(Method.POST, `/repos/${username}/${repo}/git/refs/heads/master`, accessToken, {
        sha: commit.data.sha,
        force: true,
      })

      response.status(200).send({ message: 'Success' })
    } catch (error) {
      response.status(400).send({ message: error.message })
    }
  },
}
