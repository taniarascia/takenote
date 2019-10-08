import { Actions } from 'constants/enums'
import { NoteItem, CategoryItem } from 'types'

//==============================================================================
// Notes
//==============================================================================

export const loadNotes = () => ({
  type: Actions.LOAD_NOTES,
})

export const loadNotesSuccess = (notes: NoteItem[]) => ({
  type: Actions.LOAD_NOTES_SUCCESS,
  payload: notes,
})

export const loadNotesError = (error: string) => ({
  type: Actions.LOAD_NOTES_ERROR,
  payload: error,
})

export const addNote = (note: NoteItem) => ({
  type: Actions.ADD_NOTE,
  payload: note,
})

export const updateNote = (note: NoteItem) => ({
  type: Actions.UPDATE_NOTE,
  payload: note,
})

export const deleteNote = (noteId: string) => ({
  type: Actions.DELETE_NOTE,
  payload: noteId,
})

export const swapNote = (noteId: string) => ({
  type: Actions.SWAP_NOTE,
  payload: noteId,
})

export const pruneNotes = () => ({
  type: Actions.PRUNE_NOTES,
})

//==============================================================================
// Categories
//==============================================================================

export const addCategory = (category: CategoryItem) => ({
  type: Actions.ADD_CATEGORY,
  payload: category,
})

export const loadCategories = () => ({
  type: Actions.LOAD_CATEGORIES,
})

export const loadCategoriesSuccess = (categories: CategoryItem[]) => ({
  type: Actions.LOAD_CATEGORIES_SUCCESS,
  payload: categories,
})

export const loadCategoriesError = (error: string) => ({
  type: Actions.LOAD_CATEGORIES_ERROR,
  payload: error,
})

//==============================================================================
// Sync
//==============================================================================

export const syncState = (notes: NoteItem[], categories: CategoryItem[]) => ({
  type: Actions.SYNC_STATE,
  payload: { notes, categories },
})

export const syncStateSuccess = () => ({
  type: Actions.SYNC_STATE_SUCCESS,
})

export const syncStateError = (error: string) => ({
  type: Actions.SYNC_STATE_ERROR,
  payload: error,
})
