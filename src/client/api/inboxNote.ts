import uuid from 'uuid/v4'
import moment from 'moment'

import markdown from '@/api/inboxNote.md'

export const inboxNote = {
  id: uuid(),
  text: markdown,
  category: '',
  inbox: true,
  favorite: false,
  created: moment().format(),
}
