import { Folder, NotesSortKey, DirectionText } from '@/utils/enums'

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.FAVORITES]: 'Favorites',
  [Folder.SCRATCHPAD]: 'Scratchpad',
  [Folder.TRASH]: 'Trash',
  [Folder.CATEGORY]: 'Category',
}

export const iconColor = 'rgba(255, 255, 255, 0.25)'

export const shortcutMap = [
  { action: 'Create a new note', key: 'ctrl+alt+n' },
  { action: 'Delete a note', key: 'ctrl+alt+u' },
  { action: 'Create a category', key: 'ctrl+alt+c' },
  { action: 'Download a note', key: 'ctrl+alt+o' },
  { action: 'Sync all notes', key: 'ctrl+alt+l' },
  { action: 'Toggle sidebar', key: 'ctrl+alt+s' },
  { action: 'Markdown preview', key: 'ctrl+alt+p' },
  { action: 'Toggle theme', key: 'ctrl+alt+k' },
  { action: 'Search notes', key: 'ctrl+alt+f' },
  { action: 'Prettify a note', key: 'ctrl+alt+i' },
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
