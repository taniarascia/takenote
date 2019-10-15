import { Folder } from 'constants/enums'
import { syncState } from 'slices/syncSlice'

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
  settingsState: SettingsState
}

export interface NoteState {
  notes: NoteItem[]
  activeFolder: Folder
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

export interface SettingsState {
  isOpen: boolean
  codeMirrorOptions: { [key: string]: any }
}

//==============================================================================
// Sagas
//==============================================================================

/* Sync */

export interface SyncStateAction {
  type: typeof syncState.type
  payload: {
    categories: CategoryItem[]
    notes: NoteItem[]
  }
}

/* Settings */

export interface ToggleSettingsModalAction {
  type: 'TOGGLE_SETTINGS_MODAL' // todo
}

export interface UpdateCodeMirrorOptionAction {
  type: 'UPDATE_CODE_MIRROR_OPTION' // todo
  payload: { [key: string]: any }
}

export type SettingsActionTypes = ToggleSettingsModalAction | UpdateCodeMirrorOptionAction
