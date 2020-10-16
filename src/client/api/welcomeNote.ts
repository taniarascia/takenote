import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import markdown from '@/api/welcomeNote.md'

export const welcomeNote = {
  id: uuid(),
  text: markdown,
  category: '',
  favorite: false,
  created: dayjs().format(),
}
