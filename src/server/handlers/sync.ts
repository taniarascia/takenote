import { Request, Response } from 'express'

import { SDK } from '../utils/helpers'
import { Method } from '../utils/enums'

export default {
  sync: async (request: Request, response: Response) => {
    const { accessToken, userData } = response.locals
    const { body } = request
    const username = userData.login
    const repo = 'takenote-data'

    try {
      // Create blob
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-blob
      const blob = await SDK(Method.POST, `/repos/${username}/${repo}/git/blobs`, accessToken, {
        content: 'My first blob',
      })

      // Create tree
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-tree
      const tree = await SDK(Method.POST, `/repos/${username}/${repo}/git/trees`, accessToken, {
        tree: [{ path: 'blobfile.md', mode: '100644', type: 'blob', sha: blob.data.sha }],
      })

      // Create commit
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-commit
      const commit = await SDK(Method.POST, `/repos/${username}/${repo}/git/commits`, accessToken, {
        message: 'This is a test commit',
        tree: tree.data.sha,
      })

      // Update a reference
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#update-a-reference
      const update = await SDK(
        Method.POST,
        `/repos/${username}/${repo}/git/refs/heads/master`,
        accessToken,
        { sha: commit.data.sha, force: true }
      )

      console.log(update.data)

      response.status(200).send({ message: 'Success' })
    } catch (error) {
      console.log('Message ==============>')
      console.log(error.message)
      console.log(error)
      response.status(400).send({ message: error.message })
    }
  },
}
