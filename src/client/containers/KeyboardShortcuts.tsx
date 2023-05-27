import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import prettier from 'prettier/standalone'
import parserMarkdown from 'prettier/parser-markdown'

import { useTempState } from '@/contexts/TempStateContext'
import { Folder, Shortcuts } from '@/utils/enums'
import { downloadNotes, getActiveNote, newNoteHandlerHelper } from '@/utils/helpers'
import { useKey } from '@/utils/hooks'
import {
  addNote,
  swapFolder,
  toggleTrashNotes,
  updateActiveNote,
  updateSelectedNotes,
  updateNote,
} from '@/slices/note'
import { sync } from '@/slices/sync'
import { getCategories, getNotes, getSettings } from '@/selectors'
import { CategoryItem, NoteItem } from '@/types'
import { toggleDarkTheme, togglePreviewMarkdown, updateCodeMirrorOption } from '@/slices/settings'
import { shortcutMap } from '@/utils/constants'

export const KeyboardShortcuts: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { categories } = useSelector(getCategories)
  const { activeCategoryId, activeFolder, activeNoteId, notes, selectedNotesIds } =
    useSelector(getNotes)
  const { darkTheme, previewMarkdown, shortcuts } = useSelector(getSettings)

  const activeNote = getActiveNote(notes, activeNoteId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))
  const _updateSelectedNotes = (noteId: string, multiSelect: boolean) =>
    dispatch(updateSelectedNotes({ noteId, multiSelect }))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder({ folder }))
  const _toggleTrashNotes = (noteId: string) => dispatch(toggleTrashNotes(noteId))
  const _sync = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(
      sync({
        notes,
        categories,
        shortcuts,
      })
    )
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
      _updateActiveNote,
      _updateSelectedNotes
    )
  const newTempCategoryHandler = () => !addingTempCategory && setAddingTempCategory(true)
  const trashNoteHandler = () => _toggleTrashNotes(activeNote!.id)
  const syncNotesHandler = () => _sync(notes, categories)
  const downloadNotesHandler = () => {
    if (!activeNote || selectedNotesIds.length === 0) return
    downloadNotes(
      selectedNotesIds.includes(activeNote.id)
        ? notes.filter((note) => selectedNotesIds.includes(note.id))
        : [activeNote],
      categories
    )
  }
  const togglePreviewMarkdownHandler = () => _togglePreviewMarkdown()
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }
  const prettifyNoteHandler = () => {
    // format current note with prettier
    if (activeNote && activeNote.text) {
      const formattedText = prettier.format(activeNote.text, {
        parser: 'markdown',
        plugins: [parserMarkdown],
      })

      const updatedNote = {
        ...activeNote,
        text: formattedText,
      }

      dispatch(updateNote(updatedNote))
    }
  }

  // ===========================================================================
  // Hooks
  // ===========================================================================

  const sortedShortcuts = [...shortcuts].sort((a, b) => a.id - b.id)

  useKey(sortedShortcuts[0].key, () => newNoteHandler())
  useKey(sortedShortcuts[1].key, () => trashNoteHandler())
  useKey(sortedShortcuts[2].key, () => newTempCategoryHandler())
  useKey(sortedShortcuts[3].key, () => downloadNotesHandler())
  useKey(sortedShortcuts[4].key, () => syncNotesHandler())
  useKey(sortedShortcuts[6].key, () => togglePreviewMarkdownHandler())
  useKey(sortedShortcuts[7].key, () => toggleDarkThemeHandler())
  useKey(sortedShortcuts[9].key, () => prettifyNoteHandler())

  return null
}
