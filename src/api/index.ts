export const requestNotes = () => {
  return new Promise((resolve, reject) => {
    const notes = localStorage.getItem('notes') || '[]'

    if (notes) {
      resolve(JSON.parse(notes))
    } else {
      reject({
        message: 'Not found',
      })
    }
  })
}

export const saveState = ({ payload }) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('notes', JSON.stringify(payload))

    if (false) {
      reject({ message: 'Sync failed' })
    }

    resolve(JSON.parse(localStorage.getItem('notes') || '[]'))
  })
}
