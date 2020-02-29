import { NoteItem, SyncStatePayload, SettingsState } from '../types'

import { welcomeNote } from '@/api/welcomeNote'
import { scratchpadNote } from '@/api/scratchpadNote'

type PromiseCallback = (value?: any) => void
type GetLocalStorage = (
  key: string,
  errorMsg?: string
) => (resolve: PromiseCallback, reject: PromiseCallback) => void
const getLocalStorage: GetLocalStorage = (key, errorMsg = 'Something went wrong') => (
  resolve,
  reject
) => {
  const data = localStorage.getItem(key)

  if (data) {
    resolve(JSON.parse(data))
  } else {
    reject({
      message: errorMsg,
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

export const requestNotes = () => new Promise(getUserNotes())

export const requestCategories = () => new Promise(getLocalStorage('categories'))

export const requestSettings = () =>
  new Promise(getLocalStorage('settings', 'Could not load code mirror options. An error occurred'))

export const saveState = ({ categories, notes }: SyncStatePayload) =>
  new Promise(resolve => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('notes', JSON.stringify(notes))

    resolve({
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    })
  })

export const saveSettings = (settings: SettingsState) =>
  Promise.resolve(localStorage.setItem('settings', JSON.stringify(settings)))
