import { Folder } from 'constants/enums'
import { syncState } from 'slices/sync'

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

export interface CategoryState {
  categories: CategoryItem[]
  error: string
  loading: boolean
}

export interface NoteState {
  notes: NoteItem[]
  activeFolder: Folder
  activeNoteId: string
  activeCategoryId: string
  error: string
  loading: boolean
}

export interface SettingsState {
  isOpen: boolean
  codeMirrorOptions: { [key: string]: any }
}

export interface SyncState {
  syncing: boolean
  error: string
}

export interface ThemeState {
  dark: boolean
}

export interface RootState {
  categoryState: CategoryState
  noteState: NoteState
  settingsState: SettingsState
  syncState: SyncState
  themeState: ThemeState
}

//==============================================================================
// Sagas
//==============================================================================

export interface SyncStateAction {
  type: typeof syncState.type
  payload: {
    categories: CategoryItem[]
    notes: NoteItem[]
  }
}
