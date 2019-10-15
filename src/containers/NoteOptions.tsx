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
          <div className="nav-button" onClick={deleteNoteHandler}>
            <X size={15} />
            Delete permanently
          </div>
          <div className="nav-button" onClick={trashNoteHandler}>
            <ArrowUp size={15} />
            Restore from trash
          </div>
        </>
      ) : (
        <>
          <div className="nav-button" onClick={favoriteNoteHandler}>
            <Bookmark size={15} />
            {clickedNote.favorite ? 'Remove Favorite' : 'Mark as Favorite'}
          </div>
          <div className="nav-button" onClick={trashNoteHandler}>
            <Trash size={15} />
            Move to trash
          </div>
        </>
      )}
      <div className="nav-button" onClick={downloadNoteHandler}>
        <Download size={15} />
        Download
      </div>
    </nav>
  )
}

export default NoteOptions
