import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import { NoteItem, SyncPayload, SettingsState } from '@/types'

const scratchpadNote = {
  id: uuid(),
  text: `# Scratchpad

The easiest note to find.`,
  category: '',
  scratchpad: true,
  favorite: false,
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
}

const markdown = `# Welcome to Takenote!

TakeNote is a free, open-source notes app for the web. It is a demo project only, and does not integrate with any database or cloud. Your notes are saved in local storage and will not be permanently persisted, but are available for download.

View the source on [Github](https://github.com/taniarascia/takenote).

## Features

- **Plain text notes** - take notes in an IDE-like environment that makes no assumptions
- **Markdown preview** - view rendered HTML
- **Linked notes** - use \`{{uuid}}\` syntax to link to notes within other notes
- **Syntax highlighting** - light and dark mode available (based on the beautiful [New Moon theme](https://taniarascia.github.io/new-moon/))
- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options
- **Drag and drop** - drag a note or multiple notes to categories, favorites, or trash
- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options
- **Search notes** - easily search all notes, or notes within a category
- **Prettify notes** - use Prettier on the fly for your Markdown
- **No WYSIWYG** - made for developers, by developers
- **No database** - notes are only stored in the browser's local storage and are available for download and export to you alone
- **No tracking or analytics** - 'nuff said
- **GitHub integration** - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo)
`

const welcomeNote = {
  id: uuid(),
  text: markdown,
  category: '',
  favorite: false,
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
}

type PromiseCallback = (value?: any) => void
type GetLocalStorage = (
  key: string,
  errorMessage?: string
) => (resolve: PromiseCallback, reject: PromiseCallback) => void

const getLocalStorage: GetLocalStorage = (key, errorMessage = 'Something went wrong') => (
  resolve,
  reject
) => {
  const data = localStorage.getItem(key)

  const exampleNote = [
    {
      id: 'e0196fd9-d644-4ca8-aa58-467b8082993e',
      text:
        "# Welcome to Takenote!\n\nTakenote is a  web-based note-taking app with GitHub sync (soon™️) and Markdown support. Check out the project on [Github](https://github.com/taniarascia/takenote).\n\n## Features\n\n- Plain text notes with Markdown highlighting and frontmatter metadata\n- Add, update, download, temporarily delete and delete notes\n- Add, update, and delete categories\n- Add notes to categories or mark note as favorite\n- Keybinding shortcuts for common actions\n- Settings for light/dark mode, sync frequency, and Vim mode\n- Multi-cursor editing\n\n## Creating and adding notes to a category\n\n- Click on the `+` icon in the sidebar\n- Enter a name for the category\n- Move any existing notes by dragging and dropping the note into the category\n\t- or select the category in the dropdown by clicking on the three dots next to the notes name\n- Select the category name\n- Done!\n\n## Favorite, delete or download a note\n\n- Click on the three dots next to the name of the note\n- Click 'Mark as Favorite' if you want to favorite your note\n- Click 'Move to trash' if you want to delete a note\n\t- you can always recover a deleted note by clicking 'Trash' in the sidebar and then 'Restore from trash'\n- Click 'Download' if you want to download your note as a markdown file to your device\n\n## Dark mode and Vim mode\n\nDark mode and Vim mode can be enabled in the settings which can be accessed by clicking the settings icon in the sidebar.\n\n## Sync\n\nCurrently, notes are stored in your browsers localStorage. \n\nIn the future, you will be able to sync your notes by clicking on the 'Sync notes' button in the sidebar. Your notes will be stored on Github as a gist file.\n\n## Keyboard shortcuts\n\n| Action          | Windows/Linux Shortcut | Mac Shortcut           |\n|-----------------|------------------------|------------------------|\n| Create note     | `CTRL` + `ALT` + `N`   | `CTR` + `OPTION` + `N` |\n| Delete note     | `CTRL` + `ALT` + `W`   | `CTR` + `OPTION` + `W` |\n| Create category | `CTRL` + `ALT` + `C`   | `CTR` + `OPTION` + `C` |\n| Download note   | `CTRL` + `ALT` + `D`   | `CTR` + `OPTION` + `D` |\n| Sync note       | `CTRL` + `ALT` + `S`   | `CTR` + `OPTION` + `S` |\n\n## Markdown support\n\n# H1 Heading\n## H2 Heading\n### H3 Heading\n#### H4 Heading\n##### H5 Heading\n###### H6 Heading\n\nThis is a link to the [takenote project page](https://github.com/taniarascia/takenote).\n\nThis is **bold text** and __this as well__. Italic text is created like *this*. You can even combine the two to create ***bold italic*** text.\n\n```\nconst helloWorld = () => {\n\tconsole.log('Hello World!')\n}\nhelloWorld()\n```\nThe code above is a code block fenced with three back-ticks. Inline code can be created by wrapping it in `back-ticks`.\n\n\n\nEdit this file in order to save it, otherwise it will be delete.\n\n\n",
      category: '',
      favorite: false,
      created: Date.now,
    },
  ]

  if (JSON.parse(data).length > 0) {
    resolve(JSON.parse(data))
  } else if (JSON.parse(data).length === 0) {
    resolve(exampleNote)
   else {
    reject({
      message: errorMessage,
    })
  }
}

const getUserNotes = () => (resolve: PromiseCallback, reject: PromiseCallback) => {
  const notes: any = localStorage.getItem('notes')

  // check if there is any data in localstorage
  if (!notes) {
    // if there is none (i.e. new user), create the welcomeNote and scratchpadNote
    resolve([scratchpadNote, welcomeNote])
  } else if (Array.isArray(JSON.parse(notes))) {
    // if there is (existing user), show the user's notes
    resolve(
      // find does not work if the array is empty.
      JSON.parse(notes).length === 0 || !JSON.parse(notes).find((note: NoteItem) => note.scratchpad)
        ? [scratchpadNote, ...JSON.parse(notes)]
        : JSON.parse(notes)
    )
  } else {
    reject({
      message: 'Something went wrong',
    })
  }
}

export const saveState = ({ categories, notes }: SyncPayload) =>
  new Promise((resolve) => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('notes', JSON.stringify(notes))

    resolve({
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    })
  })

export const saveSettings = ({ isOpen, ...settings }: SettingsState) =>
  Promise.resolve(localStorage.setItem('settings', JSON.stringify(settings)))

export const requestNotes = () => new Promise(getUserNotes())
export const requestCategories = () => new Promise(getLocalStorage('categories'))
export const requestSettings = () => new Promise(getLocalStorage('settings'))
