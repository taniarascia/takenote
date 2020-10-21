import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import markdown from './scratchpadNote.md'

export const scratchpadNote = {
  id: uuid(),
  text: markdown,
  category: '',
  scratchpad: true,
  favorite: false,
  created: dayjs().format(),
}
