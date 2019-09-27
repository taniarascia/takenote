import { ADD_NOTE, UPDATE_NOTE, SWAP_NOTE } from 'constants/actionTypes'

export const addNote = note => ({
  type: ADD_NOTE,
  payload: note,
})

export const updateNote = note => ({
  type: UPDATE_NOTE,
  payload: note,
})

export const swapNote = noteId => ({
  type: SWAP_NOTE,
  payload: noteId,
})
