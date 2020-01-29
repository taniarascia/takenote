import React from 'react'

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
  draggedOver: boolean
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
  searchValue: string
}

export interface SettingsState {
  isOpen: boolean
  previewMarkdown: boolean
  loading: boolean
  darkTheme: boolean
  codeMirrorOptions: { [key: string]: any }
}

export interface SyncState {
  syncing: boolean
  lastSynced: string
  error: string
}

export interface RootState {
  categoryState: CategoryState
  noteState: NoteState
  settingsState: SettingsState
  syncState: SyncState
}

//==============================================================================
// API
//==============================================================================

export interface SyncStatePayload {
  categories: CategoryItem[]
  notes: NoteItem[]
}

export interface SyncStateAction {
  type: typeof syncState.type
  payload: SyncStatePayload
}

//==============================================================================
// Events
//==============================================================================

export type ReactDragEvent = React.DragEvent<HTMLDivElement>

export type ReactMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement>
  | React.ChangeEvent<HTMLSelectElement>

export type ReactSubmitEvent = React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
