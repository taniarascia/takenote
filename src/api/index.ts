import { CategoryItem, NoteItem } from 'types'

export const requestNotes = () => {
  return new Promise((resolve, reject) => {
    const data = localStorage.getItem('notes') || '[]'

    if (data) {
      resolve(JSON.parse(data))
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
