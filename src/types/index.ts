import { Actions } from 'constants/enums'

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

//==============================================================================
// Actions
//==============================================================================

/* Sync */

export interface SyncStateAction {
  type: typeof Actions.SYNC_STATE
  payload: {
    categories: CategoryItem[]
    notes: NoteItem[]
  }
}

export interface SyncStateSuccessAction {
  type: typeof Actions.SYNC_STATE_SUCCESS
}

export interface SyncStateErrorAction {
  type: typeof Actions.SYNC_STATE_ERROR
  payload: string
}

export type SyncStateActionTypes = SyncStateAction | SyncStateSuccessAction | SyncStateErrorAction

/* Notes */

export interface LoadNotesAction {
  type: typeof Actions.LOAD_NOTES
}

export interface LoadNotesSuccessAction {
  type: typeof Actions.LOAD_NOTES_SUCCESS
  payload: NoteItem[]
}

export interface LoadNotesErrorAction {
  type: typeof Actions.LOAD_NOTES_ERROR
  payload: string
}

export interface AddNoteAction {
  type: typeof Actions.ADD_NOTE
  payload: NoteItem
}

export interface DeleteNoteAction {
  type: typeof Actions.DELETE_NOTE
  payload: string
}

export interface ToggleTrashAction {
  type: typeof Actions.TOGGLE_TRASHED_NOTE
  payload: string
}

export interface ToggleFavoriteNoteAction {
  type: typeof Actions.TOGGLE_FAVORITE_NOTE
  payload: string
}

export interface UpdateNoteAction {
  type: typeof Actions.UPDATE_NOTE
  payload: NoteItem
}

export interface SwapNoteAction {
  type: typeof Actions.SWAP_NOTE
  payload: string
}

export interface SwapCategoryAction {
  type: typeof Actions.SWAP_CATEGORY
  payload: string
}

export interface PruneNotesAction {
  type: typeof Actions.PRUNE_NOTES
  payload: string
}

export interface PruneCategoryFromNotesAction {
  type: typeof Actions.PRUNE_CATEGORY_FROM_NOTES
  payload: string
}

export interface AddCategoryToNoteAction {
  type: typeof Actions.ADD_CATEGORY_TO_NOTE
  payload: {
    categoryId: string
    noteId: string
  }
}

export interface SwapFolderAction {
  type: typeof Actions.SWAP_FOLDER
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
  type: typeof Actions.LOAD_CATEGORIES
}

export interface LoadCategoriesSuccessAction {
  type: typeof Actions.LOAD_CATEGORIES_SUCCESS
  payload: CategoryItem[]
}

export interface LoadCategoriesErrorAction {
  type: typeof Actions.LOAD_CATEGORIES_ERROR
  payload: string
}

export interface AddCategoryAction {
  type: typeof Actions.ADD_CATEGORY
  payload: CategoryItem
}

export interface DeleteCategoryAction {
  type: typeof Actions.DELETE_CATEGORY
  payload: string
}

export interface UpdateCategoryAction {
  type: typeof Actions.UPDATE_CATEGORY
  payload: CategoryItem
}

export type CategoryActionTypes =
  | LoadCategoriesAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesErrorAction
  | AddCategoryAction
  | DeleteCategoryAction
  | UpdateCategoryAction
