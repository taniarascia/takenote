export const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const getNoteTitle = text => {
  let noteTitle

  if (!text) {
    noteTitle = 'New Note'
  } else if (text.indexOf('\n') !== -1) {
    noteTitle = text.slice(0, text.indexOf('\n'))
  } else {
    noteTitle = text.slice(0, 50)
  }

  return noteTitle
}
