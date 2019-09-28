export const requestNotes = () => {
  return new Promise((resolve, reject) => {
    const notes = localStorage.getItem('notes')

    if (notes) {
      resolve(notes)
    } else {
      reject({
        message: 'Not found',
      })
    }
  })
}
