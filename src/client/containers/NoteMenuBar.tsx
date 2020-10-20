import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, Star, Trash2, Download, RefreshCw, Loader, Settings, Sun, Moon } from 'react-feather'

import { TestID } from '@resources/TestID'
import { LastSyncedNotification } from '@/components/LastSyncedNotification'
import { NoteItem, CategoryItem } from '@/types'
import {
  toggleSettingsModal,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateCodeMirrorOption,
} from '@/slices/settings'
import { toggleFavoriteNotes, toggleTrashNotes } from '@/slices/note'
import { getCategories, getNotes, getSync, getSettings } from '@/selectors'
import { downloadNotes } from '@/utils/helpers'
import { sync } from '@/slices/sync'

export const NoteMenuBar = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { notes, activeNoteId } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)
  const { syncing, lastSynced } = useSelector(getSync)
  const { darkTheme } = useSelector(getSettings)
  const activeNote = notes.find((note) => note.id === activeNoteId)!

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleTrashNotes = (noteId: string) => dispatch(toggleTrashNotes(noteId))
  const _toggleFavoriteNotes = (noteId: string) => dispatch(toggleFavoriteNotes(noteId))
  const _sync = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(sync({ notes, categories }))
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const downloadNotesHandler = () => downloadNotes([activeNote], categories)
  const favoriteNoteHandler = () => _toggleFavoriteNotes(activeNoteId)
  const trashNoteHandler = () => _toggleTrashNotes(activeNoteId)
  const syncNotesHandler = () => _sync(notes, categories)
  const settingsHandler = () => _toggleSettingsModal()
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }

  return (
    <section className="note-menu-bar">
      <nav>
        <button className="note-menu-bar-button" onClick={_togglePreviewMarkdown}>
          <Eye size={18} />
        </button>
        {!activeNote.scratchpad && (
          <>
            <button className="note-menu-bar-button" onClick={favoriteNoteHandler}>
              <Star size={18} />
            </button>
            <button className="note-menu-bar-button" onClick={trashNoteHandler}>
              <Trash2 size={18} />
            </button>
          </>
        )}
        <button className="note-menu-bar-button">
          <Download size={18} onClick={downloadNotesHandler} />
        </button>
      </nav>
      <nav>
        <LastSyncedNotification datetime={lastSynced} />
        <button
          className="note-menu-bar-button"
          onClick={syncNotesHandler}
          data-testid={TestID.TOPBAR_ACTION_SYNC_NOTES}
        >
          {syncing ? <Loader size={18} /> : <RefreshCw size={18} />}
        </button>
        <button className="note-menu-bar-button" onClick={toggleDarkThemeHandler}>
          {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="note-menu-bar-button" onClick={settingsHandler}>
          <Settings size={18} />
        </button>
      </nav>
    </section>
  )
}
