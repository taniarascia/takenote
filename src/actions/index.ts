import { ActionType } from 'constants/actionType'

export const addNote = note => ({
  type: ActionType.ADD_NOTE,
  payload: note,
})

export const updateNote = note => ({
  type: ActionType.UPDATE_NOTE,
  payload: note,
})

export const swapNote = noteId => ({
  type: ActionType.SWAP_NOTE,
  payload: noteId,
})
