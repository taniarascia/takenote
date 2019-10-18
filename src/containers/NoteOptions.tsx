import React from 'react'
import { ArrowUp, Bookmark, Download, Trash, X } from 'react-feather'
import { useDispatch } from 'react-redux'

import { downloadNote, getNoteTitle } from 'helpers'
import { deleteNote, toggleFavoriteNote, toggleTrashedNote } from 'slices/note'
import { NoteItem } from 'types'

export interface NoteOptionsProps {
  clickedNote: NoteItem
}

const NoteOptions: React.FC<NoteOptionsProps> = ({ clickedNote }) => {
  const dispatch = useDispatch()

  const _deleteNote = (noteId: string) => dispatch(deleteNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))

  const deleteNoteHandler = () => {
    _deleteNote(clickedNote.id)
  }

  const downloadNoteHandler = () => {
    if (clickedNote) {
      downloadNote(getNoteTitle(clickedNote.text), clickedNote)
    }
  }

  const favoriteNoteHandler = () => {
    _toggleFavoriteNote(clickedNote.id)
  }

  const trashNoteHandler = () => {
    _toggleTrashedNote(clickedNote.id)
  }

  return (
    <nav className="note-options-nav" data-testid="note-options-nav">
      {clickedNote.trash ? (
        <>
          <div className="nav-item" onClick={deleteNoteHandler}>
            <X size={18} />
            Delete permanently
          </div>
          <div className="nav-item" onClick={trashNoteHandler}>
            <ArrowUp size={18} />
            Restore from trash
          </div>
        </>
      ) : (
        <>
          <div className="nav-item" onClick={favoriteNoteHandler}>
            <Bookmark size={18} />
            {clickedNote.favorite ? 'Remove Favorite' : 'Mark as Favorite'}
          </div>
          <div className="nav-item" onClick={trashNoteHandler}>
            <Trash size={18} />
            Move to trash
          </div>
        </>
      )}
      <div className="nav-item" onClick={downloadNoteHandler}>
        <Download size={18} />
        Download
      </div>
    </nav>
  )
}

export default NoteOptions
