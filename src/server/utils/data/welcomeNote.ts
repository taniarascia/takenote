import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const markdown = `# Welcome to Takenote!

TakeNote is a free, open-source notes app with GitHub sync (soon™️). Check out the project on [Github](https://github.com/taniarascia/takenote).

## Features

- Open source and web-based
- GitHub sync
- Plain text notes
- Markdown preview
- Syntax highlighting
- Keyboard shortcuts
- Drag and drop
- Favorites and categories
- Multi-note actions
- Multi-cursor editing
- Light/dark theme
- Search notes
- Prettify notes
- No WYSIWYG
- No database
- No tracking or analytics`

export const welcomeNote = {
  id: uuid(),
  text: markdown,
  category: '',
  favorite: false,
  created: dayjs().format(),
}
