import { CategoryItem, NoteItem } from 'types'

import { exampleNote } from './exampleNote'

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

    if (data === null) {
      localStorage.setItem('notes', '[]')
      resolve(exampleNote)
    } else if (JSON.parse(data)) {
      resolve(JSON.parse(data))
    } else {
      reject({
        message: 'Something went wrong',
      })
    }
  })

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
