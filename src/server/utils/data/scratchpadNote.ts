import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

export const scratchpadNote = {
  id: uuid(),
  text: `# Scratchpad

The easiest note to find.`,
  category: '',
  scratchpad: true,
  favorite: false,
  created: dayjs().format(),
}
