import uuid from 'uuid/v4'
import moment from 'moment'

import markdown from '@/api/note.md'

export const welcomeNote = [
  {
    id: uuid(),
    text: markdown,
    category: '',
    favorite: false,
    created: moment().format(),
  },
]
