import { SyncStatePayload } from 'types'

import { welcomeNote } from './welcomeNote'

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
    const data = localStorage.getItem('notes')

    if (!data) {
      localStorage.setItem('notes', '[]')
      resolve(welcomeNote)
    } else if (JSON.parse(data)) {
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
