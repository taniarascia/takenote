import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTempState } from 'contexts/TempStateContext'
import { downloadNote, getNoteTitle, newNote } from 'helpers'
import { useKey, useInterval } from 'helpers/hooks'
import { addNote, swapNote, toggleTrashedNote } from 'slices/note'
import { syncState } from 'slices/sync'
import { toggleDarkTheme } from 'slices/theme'
import { RootState, CategoryItem, NoteItem } from 'types'
import { updateCodeMirrorOption } from 'slices/settings'

const KeyboardShortcuts: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const { dark } = useSelector((state: RootState) => state.themeState)

  const activeNote = notes.find(note => note.id === activeNoteId)

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: string) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  const { addingTempCategory, setAddingTempCategory } = useTempState()
  const newNoteHandler = () => {
    const note = newNote(activeCategoryId, activeFolder)

    if ((activeNote && activeNote.text !== '' && !activeNote.trash) || !activeNote) {
      _addNote(note)
      _swapNote(note.id)
    }
  }

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

  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', dark ? 'base16-light' : 'zenburn')
  }

  useKey('ctrl+alt+n', () => {
    newNoteHandler()
  })

  useKey('ctrl+alt+c', () => {
    newTempCategoryHandler()
  })

  useKey('ctrl+alt+w', () => {
    trashNoteHandler()
  })

  useKey('ctrl+alt+s', () => {
    syncNotesHandler()
  })

  useKey('ctrl+alt+d', () => {
    downloadNoteHandler()
  })

  useKey('ctrl+alt+k', () => {
    toggleDarkThemeHandler()
  })

  useInterval(() => {
    _syncState(notes, categories)
  }, 30000)

  return null
}

export default KeyboardShortcuts
