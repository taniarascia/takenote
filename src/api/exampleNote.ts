import uuid from 'uuid/v4'
import moment from 'moment'

import data from '../exampleNote.md'

console.log(data)

export const exampleNote = [
  {
    id: uuid(),
    text: data,
    category: '',
    favorite: false,
    created: moment().format(),
  },
]
