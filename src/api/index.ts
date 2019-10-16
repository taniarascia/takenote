import { CategoryItem, NoteItem } from 'types'

export const requestNotes = () => {
  return new Promise((resolve, reject) => {
    const data = localStorage.getItem('notes') || '[]'

    const exampleNote = [
      {
        id: 'e0196fd9-d644-4ca8-aa58-467b8082993e',
        text:
          "# Welcome to Takenote!\n\nTakenote is a  web-based note-taking app with GitHub sync (soon™️) and Markdown support. Check out the project on [Github](https://github.com/taniarascia/takenote).\n\n## Features\n\n- Plain text notes with Markdown highlighting and frontmatter metadata\n- Add, update, download, temporarily delete and delete notes\n- Add, update, and delete categories\n- Add notes to categories or mark note as favorite\n- Keybinding shortcuts for common actions\n- Settings for light/dark mode, sync frequency, and Vim mode\n- Multi-cursor editing\n\n## Creating and adding notes to a category\n\n- Click on the `+` icon in the sidebar\n- Enter a name for the category\n- Move any existing notes by dragging and dropping the note into the category\n\t- or select the category in the dropdown by clicking on the three dots next to the notes name\n- Select the category name\n- Done!\n\n## Favorite, delete or download a note\n\n- Click on the three dots next to the name of the note\n- Click 'Mark as Favorite' if you want to favorite your note\n- Click 'Move to trash' if you want to delete a note\n\t- you can always recover a deleted note by clicking 'Trash' in the sidebar and then 'Restore from trash'\n- Click 'Download' if you want to download your note as a markdown file to your device\n\n## Dark mode and Vim mode\n\nDark mode and Vim mode can be enabled in the settings which can be accessed by clicking the settings icon in the sidebar.\n\n## Sync\n\nCurrently, notes are stored in your browsers localStorage. \n\nIn the future, you will be able to sync your notes by clicking on the 'Sync notes' button in the sidebar. Your notes will be stored on Github as a gist file.\n\n## Keyboard shortcuts\n\n| Action          | Windows/Linux Shortcut | Mac Shortcut           |\n|-----------------|------------------------|------------------------|\n| Create note     | `CTRL` + `ALT` + `N`   | `CTR` + `OPTION` + `N` |\n| Delete note     | `CTRL` + `ALT` + `W`   | `CTR` + `OPTION` + `W` |\n| Create category | `CTRL` + `ALT` + `C`   | `CTR` + `OPTION` + `C` |\n| Download note   | `CTRL` + `ALT` + `D`   | `CTR` + `OPTION` + `D` |\n| Sync note       | `CTRL` + `ALT` + `S`   | `CTR` + `OPTION` + `S` |\n\n## Markdown support\n\n# H1 Heading\n## H2 Heading\n### H3 Heading\n#### H4 Heading\n##### H5 Heading\n###### H6 Heading\n\nThis is a link to the [takenote project page](https://github.com/taniarascia/takenote).\n\nThis is **bold text** and __this as well__. Italic text is created like *this*. You can even combine the two to create ***bold italic*** text.\n\n```\nconst helloWorld = () => {\n\tconsole.log('Hello World!')\n}\nhelloWorld()\n```\nThe code above is a code block fenced with three back-ticks. Inline code can be created by wrapping it in `back-ticks`.\n\n\n\nEdit this file in order to save it, otherwise it will be delete.\n\n\n",
        category: '',
        favorite: false,
        created: Date.now,
      },
    ]

    if (JSON.parse(data).length > 0) {
      resolve(JSON.parse(data))
    } else if (JSON.parse(data).length === 0) {
      resolve(exampleNote)
    } else {
      reject({
        message: 'Something went wrong',
      })
    }
  })
}

export const requestCategories = () => {
  return new Promise((resolve, reject) => {
    const data = localStorage.getItem('categories') || '[]'

    if (data) {
      resolve(JSON.parse(data))
    } else {
      reject({
        message: 'Something went wrong',
      })
    }
  })
}

export const saveState = (notes: NoteItem[], categories: CategoryItem[]) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.setItem('categories', JSON.stringify(categories))

    resolve({
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
    })
  })
}
