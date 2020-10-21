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
      // Get a reference
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#update-a-reference
      const ref = await SDK(
        Method.GET,
        `/repos/${username}/${repo}/git/refs/heads/master`,
        accessToken
      )

      // Create blobs
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-blob
      const [noteBlob, categoryBlob, settingsBlob] = await Promise.all([
        SDK(Method.POST, `/repos/${username}/${repo}/git/blobs`, accessToken, {
          content: JSON.stringify(notes, null, 2),
        }),
        SDK(Method.POST, `/repos/${username}/${repo}/git/blobs`, accessToken, {
          content: JSON.stringify(categories, null, 2),
        }),
        SDK(Method.POST, `/repos/${username}/${repo}/git/blobs`, accessToken, {
          content: JSON.stringify(settings, null, 2),
        }),
      ])
      const treeItems = [
        {
          path: 'notes.json',
          sha: noteBlob.data.sha,
          mode: '100644',
          type: 'blob',
        },
        {
          path: 'categories.json',
          sha: categoryBlob.data.sha,
          mode: '100644',
          type: 'blob',
        },
        {
          path: 'settings.json',
          sha: settingsBlob.data.sha,
          mode: '100644',
          type: 'blob',
        },
      ]

      // Create tree
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-tree
      const tree = await SDK(Method.POST, `/repos/${username}/${repo}/git/trees`, accessToken, {
        tree: treeItems,
        base_tree: ref.data.object.sha,
      })

      // Create commit
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#create-a-commit
      const commit = await SDK(Method.POST, `/repos/${username}/${repo}/git/commits`, accessToken, {
        message: 'TakeNote update ' + dayjs(Date.now()).format('h:mm A M/D/YYYY'),
        tree: tree.data.sha,
        parents: [ref.data.object.sha],
      })

      // Update a reference
      // https://docs.github.com/en/free-pro-team@latest/rest/reference/git#update-a-reference
      await SDK(Method.POST, `/repos/${username}/${repo}/git/refs/heads/master`, accessToken, {
        sha: commit.data.sha,
        force: true,
      })

      response.status(200).send({ message: 'Success' })
    } catch (error) {
      console.log(error.response.data)
      console.log(error.message)
      response.status(400).send({ message: error.message })
    }
  },
}
