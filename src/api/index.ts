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

export const saveState = ({ payload }) => {
  console.log('p', payload)
  return new Promise((resolve, reject) => {
    localStorage.setItem('notes', JSON.stringify(payload.notes))
    localStorage.setItem('categories', JSON.stringify(payload.categories))

    if (false) {
      reject({ message: 'Sync failed' })
    }

    resolve({
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
    })
  })
}
