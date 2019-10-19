import uuid from 'uuid/v4'
import moment from 'moment'

import markdown from '../exampleNote.md'

function fetchMD() {
  fetch(markdown)
    .then(response => {
      return response.text()
    })
    .then(text => {
      Object.assign(exampleNote[0], { text })
    })
    .catch(err => {
      throw new Error(err)
    })
}

fetchMD()

export const exampleNote = [
  {
    id: uuid(),
    text: '',
    category: '',
    favorite: false,
    created: moment().format(),
  },
]
