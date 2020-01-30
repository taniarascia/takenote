import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTempState } from 'contexts/TempStateContext'
import { Folder } from 'constants/enums'
import { downloadNote, getNoteTitle, newNoteHandlerHelper } from 'helpers'
import { useKey } from 'helpers/hooks'
import { addNote, swapNote, toggleTrashedNote, swapFolder } from 'slices/note'
import { syncState } from 'slices/sync'
import { RootState, CategoryItem, NoteItem } from 'types'
import { updateCodeMirrorOption, togglePreviewMarkdown, toggleDarkTheme } from 'slices/settings'

const KeyboardShortcuts: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const { darkTheme, previewMarkdown } = useSelector((state: RootState) => state.settingsState)

  const activeNote = notes.find(note => note.id === activeNoteId)

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

  const { addingTempCategory, setAddingTempCategory } = useTempState()

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

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const trashNoteHandler = () => {
    if (activeNote) {
      _toggleTrashedNote(activeNote.id)
    }
  }

  const syncNotesHandler = () => {
    _syncState(notes, categories)
  }

  const downloadNoteHandler = () => {
    if (activeNote) {
      downloadNote(getNoteTitle(activeNote.text), activeNote)
    }
  }

  const togglePreviewMarkdownHandler = () => {
    _togglePreviewMarkdown()
  }

  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }

  useKey('ctrl+alt+n', () => {
    newNoteHandler()
  })

  useKey('ctrl+alt+c', () => {
    newTempCategoryHandler()
  })

  useKey('ctrl+alt+u', () => {
    trashNoteHandler()
  })

  useKey('ctrl+alt+l', () => {
    syncNotesHandler()
  })

  useKey('ctrl+alt+p', () => {
    downloadNoteHandler()
  })

  useKey('alt+ctrl+j', () => {
    togglePreviewMarkdownHandler()
  })

  useKey('alt+ctrl+k', () => {
    toggleDarkThemeHandler()
  })

  return null
}

export default KeyboardShortcuts
