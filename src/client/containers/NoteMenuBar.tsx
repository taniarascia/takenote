import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, Star, Trash2, Download, RefreshCw, Loader, Settings } from 'react-feather'

import { TestID } from '@resources/TestID'
import { LastSyncedNotification } from '@/components/LastSyncedNotification'
import { NoteItem, CategoryItem } from '@/types'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { toggleFavoriteNotes, toggleTrashNotes } from '@/slices/note'
import { getCategories, getNotes, getSync } from '@/selectors'
import { downloadNotes } from '@/utils/helpers'
import { sync } from '@/slices/sync'

export const NoteMenuBar = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { notes, activeNoteId } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)
  const { syncing, lastSynced } = useSelector(getSync)
  const activeNote = notes.find((note) => note.id === activeNoteId)!

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleTrashNotes = (noteId: string) => dispatch(toggleTrashNotes(noteId))
  const _toggleFavoriteNotes = (noteId: string) => dispatch(toggleFavoriteNotes(noteId))
  const _sync = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(sync({ notes, categories }))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const downloadNotesHandler = () => downloadNotes([activeNote], categories)
  const favoriteNoteHandler = () => _toggleFavoriteNotes(activeNoteId)
  const trashNoteHandler = () => _toggleTrashNotes(activeNoteId)
  const syncNotesHandler = () => _sync(notes, categories)
  const settingsHandler = () => _toggleSettingsModal()

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
          data-test-id={TestID.TOPBAR_ACTION_SYNC_NOTES}
        >
          {syncing ? <Loader size={18} /> : <RefreshCw size={18} />}
        </button>
        <button className="note-menu-bar-button" onClick={settingsHandler}>
          <Settings size={18} />
        </button>
      </nav>
    </section>
  )
}
