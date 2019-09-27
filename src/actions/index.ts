import { ADD_NOTE, UPDATE_NOTE, SWAP_NOTE } from '../constants/actionTypes'

export const addNote = note => ({
  type: ADD_NOTE,
  payload: note,
})

export const updateNote = note => ({
  type: UPDATE_NOTE,
  payload: note,
})

export const swapNote = note => ({
  type: SWAP_NOTE,
  payload: note.id,
})
