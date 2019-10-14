import React from 'react'
import { ArrowUp, Bookmark, Download, Trash, X } from 'react-feather'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { deleteNote, toggleFavoriteNote, toggleTrashedNote } from 'actions'
import { downloadNote, getNoteTitle } from 'helpers'
import { ApplicationState, NoteItem } from 'types'

export interface NoteOptionsProps {
  clickedNote: NoteItem
  deleteNote: (noteId: string) => void
  toggleTrashedNote: (noteId: string) => void
  toggleFavoriteNote: (noteId: string) => void
}

const NoteOptions: React.FC<NoteOptionsProps> = ({
  clickedNote,
  deleteNote,
  toggleTrashedNote,
  toggleFavoriteNote,
}) => {
  const deleteNoteHandler = () => {
    deleteNote(clickedNote.id)
  }

  const downloadNoteHandler = () => {
    if (clickedNote) {
      downloadNote(getNoteTitle(clickedNote.text), clickedNote)
    }
  }

  const favoriteNoteHandler = () => {
    toggleFavoriteNote(clickedNote.id)
  }

  const trashNoteHandler = () => {
    toggleTrashedNote(clickedNote.id)
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

const mapStateToProps = (state: ApplicationState) => ({
  activeCategoryId: state.noteState.activeCategoryId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteNote: (noteId: string) => dispatch(deleteNote(noteId)),
  toggleTrashedNote: (noteId: string) => dispatch(toggleTrashedNote(noteId)),
  toggleFavoriteNote: (noteId: string) => dispatch(toggleFavoriteNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOptions)
