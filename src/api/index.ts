import { SyncStatePayload, SettingsState } from 'types'

export const requestCategories = () =>
  new Promise((resolve, reject) => {
    const data = localStorage.getItem('categories') || '[]'

    if (data) {
      resolve(JSON.parse(data))
    } else {
      reject({ message: 'Something went wrong' })
    }
  })

export const requestNotes = () =>
  new Promise((resolve, reject) => {
    const data = localStorage.getItem('notes') || '[]'

    if (data) {
      resolve(JSON.parse(data))
    } else {
      reject({ message: 'Something went wrong' })
    }
  })

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

export const requestSettings = () =>
  new Promise((resolve, reject) => {
    const settings = localStorage.getItem('settings')
    if (settings) {
      resolve(JSON.parse(settings))
    } else {
      reject({ message: `Could not load code mirror options. An error occurred` })
    }
  })
