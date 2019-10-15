import { Action } from 'constants/enums'
import { CategoryItem, NoteItem } from 'types'

//==============================================================================
// Notes
//==============================================================================

export const loadNotes = () => ({
  type: Action.LOAD_NOTES,
})

export const loadNotesSuccess = (notes: NoteItem[]) => ({
  type: Action.LOAD_NOTES_SUCCESS,
  payload: notes,
})

export const loadNotesError = (error: string) => ({
  type: Action.LOAD_NOTES_ERROR,
  payload: error,
})

export const addNote = (note: NoteItem) => ({
  type: Action.ADD_NOTE,
  payload: note,
})

export const updateNote = (note: NoteItem) => ({
  type: Action.UPDATE_NOTE,
  payload: note,
})

export const deleteNote = (noteId: string) => ({
  type: Action.DELETE_NOTE,
  payload: noteId,
})

export const toggleTrashedNote = (noteId: string) => ({
  type: Action.TOGGLE_TRASHED_NOTE,
  payload: noteId,
})

export const toggleFavoriteNote = (noteId: string) => ({
  type: Action.TOGGLE_FAVORITE_NOTE,
  payload: noteId,
})

export const swapNote = (noteId: string) => ({
  type: Action.SWAP_NOTE,
  payload: noteId,
})

export const swapCategory = (categoryId: string) => ({
  type: Action.SWAP_CATEGORY,
  payload: categoryId,
})

export const pruneNotes = () => ({
  type: Action.PRUNE_NOTES,
})

export const pruneCategoryFromNotes = (categoryId: string) => ({
  type: Action.PRUNE_CATEGORY_FROM_NOTES,
  payload: categoryId,
})

export const addCategoryToNote = (categoryId: string, noteId: string) => ({
  type: Action.ADD_CATEGORY_TO_NOTE,
  payload: { categoryId, noteId },
})

export const swapFolder = (folder: string) => ({
  type: Action.SWAP_FOLDER,
  payload: folder,
})

//==============================================================================
// Categories
//==============================================================================

export const addCategory = (category: CategoryItem) => ({
  type: Action.ADD_CATEGORY,
  payload: category,
})

export const deleteCategory = (categoryId: string) => ({
  type: Action.DELETE_CATEGORY,
  payload: categoryId,
})

export const loadCategories = () => ({
  type: Action.LOAD_CATEGORIES,
})

export const loadCategoriesSuccess = (categories: CategoryItem[]) => ({
  type: Action.LOAD_CATEGORIES_SUCCESS,
  payload: categories,
})

export const loadCategoriesError = (error: string) => ({
  type: Action.LOAD_CATEGORIES_ERROR,
  payload: error,
})

//==============================================================================
// Sync
//==============================================================================

export const syncState = (notes: NoteItem[], categories: CategoryItem[]) => ({
  type: Action.SYNC_STATE,
  payload: { notes, categories },
})

export const syncStateSuccess = () => ({
  type: Action.SYNC_STATE_SUCCESS,
})

export const syncStateError = (error: string) => ({
  type: Action.SYNC_STATE_ERROR,
  payload: error,
})

//==============================================================================
// Theme
//==============================================================================

export const toggleDarkTheme = () => ({
  type: Action.TOGGLE_DARK_THEME,
})
