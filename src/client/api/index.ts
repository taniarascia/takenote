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
}

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

const welcomeNote = {
  id: uuid(),
  text: markdown,
  category: '',
  favorite: false,
  created: dayjs().format(),
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

  if (data) {
    resolve(JSON.parse(data))
  } else {
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
