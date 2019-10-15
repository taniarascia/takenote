import { Action } from 'constants/enums'

//==============================================================================
// Items
//==============================================================================

export interface NoteItem {
  id: string
  text: string
  created: string
  lastUpdated: string
  category?: string
  trash?: boolean
  favorite?: boolean
}

export interface CategoryItem {
  id: string
  name: string
}

//==============================================================================
// State
//==============================================================================

export interface ApplicationState {
  noteState: NoteState
  categoryState: CategoryState
  syncState: SyncState
  themeState: ThemeState
}

export interface NoteState {
  notes: NoteItem[]
  activeFolder: string
  activeNoteId: string
  activeCategoryId: string
  error: string
  loading: boolean
}

export interface CategoryState {
  categories: CategoryItem[]
  error: string
  loading: boolean
}

export interface SyncState {
  syncing: boolean
  error: string
}

export interface ThemeState {
  dark: boolean
}

//==============================================================================
// Action
//==============================================================================

/* Sync */

export interface SyncStateAction {
  type: typeof Action.SYNC_STATE
  payload: {
    categories: CategoryItem[]
    notes: NoteItem[]
  }
}

export interface SyncStateSuccessAction {
  type: typeof Action.SYNC_STATE_SUCCESS
}

export interface SyncStateErrorAction {
  type: typeof Action.SYNC_STATE_ERROR
  payload: string
}

export type SyncStateActionTypes = SyncStateAction | SyncStateSuccessAction | SyncStateErrorAction

/* Notes */

export interface LoadNotesAction {
  type: typeof Action.LOAD_NOTES
}

export interface LoadNotesSuccessAction {
  type: typeof Action.LOAD_NOTES_SUCCESS
  payload: NoteItem[]
}

export interface LoadNotesErrorAction {
  type: typeof Action.LOAD_NOTES_ERROR
  payload: string
}

export interface AddNoteAction {
  type: typeof Action.ADD_NOTE
  payload: NoteItem
}

export interface DeleteNoteAction {
  type: typeof Action.DELETE_NOTE
  payload: string
}

export interface ToggleTrashAction {
  type: typeof Action.TOGGLE_TRASHED_NOTE
  payload: string
}

export interface ToggleFavoriteNoteAction {
  type: typeof Action.TOGGLE_FAVORITE_NOTE
  payload: string
}

export interface UpdateNoteAction {
  type: typeof Action.UPDATE_NOTE
  payload: NoteItem
}

export interface SwapNoteAction {
  type: typeof Action.SWAP_NOTE
  payload: string
}

export interface SwapCategoryAction {
  type: typeof Action.SWAP_CATEGORY
  payload: string
}

export interface PruneNotesAction {
  type: typeof Action.PRUNE_NOTES
  payload: string
}

export interface PruneCategoryFromNotesAction {
  type: typeof Action.PRUNE_CATEGORY_FROM_NOTES
  payload: string
}

export interface AddCategoryToNoteAction {
  type: typeof Action.ADD_CATEGORY_TO_NOTE
  payload: {
    categoryId: string
    noteId: string
  }
}

export interface SwapFolderAction {
  type: typeof Action.SWAP_FOLDER
  payload: string
}

export type NotesActionTypes =
  | LoadNotesAction
  | LoadNotesSuccessAction
  | LoadNotesErrorAction
  | AddNoteAction
  | ToggleTrashAction
  | ToggleFavoriteNoteAction
  | DeleteNoteAction
  | UpdateNoteAction
  | SwapNoteAction
  | SwapCategoryAction
  | PruneNotesAction
  | PruneCategoryFromNotesAction
  | AddCategoryToNoteAction
  | SwapFolderAction

/* Categories */

export interface LoadCategoriesAction {
  type: typeof Action.LOAD_CATEGORIES
}

export interface LoadCategoriesSuccessAction {
  type: typeof Action.LOAD_CATEGORIES_SUCCESS
  payload: CategoryItem[]
}

export interface LoadCategoriesErrorAction {
  type: typeof Action.LOAD_CATEGORIES_ERROR
  payload: string
}

export interface AddCategoryAction {
  type: typeof Action.ADD_CATEGORY
  payload: CategoryItem
}

export interface DeleteCategoryAction {
  type: typeof Action.DELETE_CATEGORY
  payload: string
}

export interface UpdateCategoryAction {
  type: typeof Action.UPDATE_CATEGORY
  payload: CategoryItem
}

export type CategoryActionTypes =
  | LoadCategoriesAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesErrorAction
  | AddCategoryAction
  | DeleteCategoryAction
  | UpdateCategoryAction

/* Themes */

export interface ToggleDarkThemeAction {
  type: typeof Action.TOGGLE_DARK_THEME
}

export type ThemeActionTypes = ToggleDarkThemeAction
