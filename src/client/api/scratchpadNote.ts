import uuid from 'uuid/v4'
import dayjs from 'dayjs'

import markdown from '@/api/scratchpadNote.md'

export const scratchpadNote = {
  id: uuid(),
  text: markdown,
  category: '',
  scratchpad: true,
  favorite: false,
  created: dayjs().format(),
}
