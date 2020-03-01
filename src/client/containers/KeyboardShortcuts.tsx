import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTempState } from '@/contexts/TempStateContext'
import { Folder, Shortcuts } from '@/utils/enums'
import { downloadNote, getNoteTitle, newNoteHandlerHelper, getActiveNote } from '@/utils/helpers'
import { useKey } from '@/utils/hooks'
import { addNote, swapNote, toggleTrashedNote, swapFolder } from '@/slices/note'
import { syncState } from '@/slices/sync'
import { getSettings, getNotes, getCategories } from '@/selectors'
import { CategoryItem, NoteItem } from '@/types'
import { updateCodeMirrorOption, togglePreviewMarkdown, toggleDarkTheme } from '@/slices/settings'

export const KeyboardShortcuts: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { categories } = useSelector(getCategories)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes)
  const { darkTheme, previewMarkdown } = useSelector(getSettings)

  const activeNote = getActiveNote(notes, activeNoteId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: string) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  // ===========================================================================
  // State
  // ===========================================================================

  const { addingTempCategory, setAddingTempCategory } = useTempState()

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const newNoteHandler = () =>
    newNoteHandlerHelper(
      activeFolder,
      previewMarkdown,
      activeNote,
      activeCategoryId,
      _swapFolder,
      _togglePreviewMarkdown,
      _addNote,
      _swapNote
    )
  const newTempCategoryHandler = () => !addingTempCategory && setAddingTempCategory(true)
  const trashNoteHandler = () => _toggleTrashedNote(activeNote!.id)
  const syncNotesHandler = () => _syncState(notes, categories)
  const downloadNoteHandler = () => downloadNote(getNoteTitle(activeNote!.text), activeNote!)
  const togglePreviewMarkdownHandler = () => _togglePreviewMarkdown()
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useKey(Shortcuts.NEW_NOTE, () => newNoteHandler())
  useKey(Shortcuts.NEW_CATEGORY, () => newTempCategoryHandler())
  useKey(Shortcuts.DELETE_NOTE, () => trashNoteHandler())
  useKey(Shortcuts.SYNC_NOTES, () => syncNotesHandler())
  useKey(Shortcuts.DOWNLOAD_NOTES, () => downloadNoteHandler())
  useKey(Shortcuts.PREVIEW, () => togglePreviewMarkdownHandler())
  useKey(Shortcuts.TOGGLE_THEME, () => toggleDarkThemeHandler())

  return null
}
