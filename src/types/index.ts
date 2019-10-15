import { syncState } from 'slices/syncSlice'

import { Folder } from '../constants/enums'

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
