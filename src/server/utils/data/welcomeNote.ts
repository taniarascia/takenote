import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const markdown = `# Welcome to Takenote!

TakeNote is a free, open-source notes app for the web. It is a demo project only, and does not integrate with any database or cloud. Your notes are saved in local storage and will not be permanently persisted. You can download all notes in markdown format as a zip. 

View the source on [Github](https://github.com/taniarascia/takenote).

## Features

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
