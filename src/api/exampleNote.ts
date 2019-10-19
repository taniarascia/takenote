import uuid from 'uuid/v4'
import moment from 'moment'

import markdown from '../exampleNote.md'

export const exampleNote = fetch(markdown)
  .then(res => res.text())
  .then(text => {
    const exampleNote = [
      {
        id: uuid(),
        text,
        category: '',
        favorite: false,
        created: moment().format(),
      },
    ]
    return exampleNote
  })
