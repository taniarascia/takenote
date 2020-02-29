import React from 'react'

import { Folder } from '@/utils/enums'
import { syncState } from '@/slices/sync'

//==============================================================================
// Items
//==============================================================================

export interface NoteItem {
  id: string
  text: string
  created: string
  lastUpdated: string
  /**
   * Refers to the category UUID and not the actual name.
   */
  category?: string
  scratchpad?: boolean
  trash?: boolean
  favorite?: boolean
}

export interface CategoryItem {
  id: string
  name: string
  draggedOver: boolean
}

export interface GithubUser {
  [anyProp: string]: any
}

//==============================================================================
// State
//==============================================================================

export interface AuthState {
  loading: boolean
  currentUser: GithubUser
  isAuthenticated: boolean
  error?: string
}

export interface CategoryState {
  categories: CategoryItem[]
  error: string
  loading: boolean
  editingCategory: {
    id: string
    tempName: string
  }
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
  pendingSync: boolean
}

export interface RootState {
  authState: AuthState
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

//==============================================================================
// Default Types
//==============================================================================

// Taken from TypeScript private declared type within Actions
export type WithPayload<P, T> = T & {
  payload: P
}
