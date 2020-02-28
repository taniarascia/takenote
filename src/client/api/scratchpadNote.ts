import uuid from 'uuid/v4'
import moment from 'moment'

import markdown from '@/api/scratchpadNote.md'

export const scratchpadNote = {
  id: uuid(),
  text: markdown,
  category: '',
  scratchpad: true,
  favorite: false,
  created: moment().format(),
}
