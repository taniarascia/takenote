import { CategoryItem, NoteItem } from 'types'

import { exampleNote } from './exampleNote'

export const requestNotes = () => {
  return new Promise((resolve, reject) => {
    const data = localStorage.getItem('notes') || '[]'

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
