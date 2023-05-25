import { ShortcutItem } from '@/types'
import { Folder, NotesSortKey, DirectionText, Shortcuts } from '@/utils/enums'

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.FAVORITES]: 'Favorites',
  [Folder.SCRATCHPAD]: 'Scratchpad',
  [Folder.TRASH]: 'Trash',
  [Folder.CATEGORY]: 'Category',
}

export const iconColor = 'rgba(255, 255, 255, 0.25)'

export const shortcutMap = [
  { id: 1, action: 'Create a new note', key: 'ctrl+alt+n', originalKey: Shortcuts.NEW_NOTE },
  { id: 2, action: 'Delete a note', key: 'ctrl+alt+u', originalKey: Shortcuts.DELETE_NOTE },
  { id: 3, action: 'Create a category', key: 'ctrl+alt+c', originalKey: Shortcuts.NEW_CATEGORY },
  { id: 4, action: 'Download a note', key: 'ctrl+alt+o', originalKey: Shortcuts.DOWNLOAD_NOTES },
  { id: 5, action: 'Sync all notes', key: 'ctrl+alt+l', originalKey: Shortcuts.SYNC_NOTES },
  { id: 6, action: 'Toggle sidebar', key: 'ctrl+alt+s' },
  { id: 7, action: 'Markdown preview', key: 'ctrl+alt+p', originalKey: Shortcuts.PREVIEW },
  { id: 8, action: 'Toggle theme', key: 'ctrl+alt+k', originalKey: Shortcuts.TOGGLE_THEME },
  { id: 9, action: 'Search notes', key: 'ctrl+alt+f', originalKey: Shortcuts.SEARCH },
  { id: 10, action: 'Prettify a note', key: 'ctrl+alt+i', originalKey: Shortcuts.PRETTIFY },
]

export const notesSortOptions = [
  { value: NotesSortKey.TITLE, label: 'Title' },
  { value: NotesSortKey.CREATED_DATE, label: 'Date Created' },
  { value: NotesSortKey.LAST_UPDATED, label: 'Last Updated' },
]

export const directionTextOptions = [
  { value: DirectionText.LEFT_TO_RIGHT, label: 'Left to right' },
  { value: DirectionText.RIGHT_TO_LEFT, label: 'Right to left' },
]
