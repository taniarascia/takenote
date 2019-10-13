import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Bookmark, Download, Trash } from 'react-feather'
import { sendNoteToTrash, toggleFavoriteNote } from 'actions'
import { NoteItem, ApplicationState } from 'types'
import { getNoteTitle, downloadNote } from 'helpers'

export interface NoteOptionsProps {
  sendNoteToTrash: (noteId: string) => void
  toggleFavoriteNote: (noteId: string) => void
  clickedNote: NoteItem
}

const NoteOptions: React.FC<NoteOptionsProps> = ({
  sendNoteToTrash,
  toggleFavoriteNote,
  clickedNote,
}) => {
  const trashNoteHandler = () => {
    if (clickedNote && !clickedNote.trash) {
      sendNoteToTrash(clickedNote.id)
    }
  }

  const favoriteNoteHandler = () => {
    toggleFavoriteNote(clickedNote.id)
  }

  const downloadNoteHandler = () => {
    if (clickedNote) {
      downloadNote(getNoteTitle(clickedNote.text), clickedNote)
    }
  }

  return (
    <nav className="note-options-nav" data-testid="note-options-nav">
      {!clickedNote.trash && (
        <div className="nav-button" onClick={favoriteNoteHandler}>
          <Bookmark size={15} />
          {clickedNote.favorite ? 'Remove Favorite' : 'Mark as Favorite'}
        </div>
      )}
      <div className="nav-button" onClick={trashNoteHandler}>
        <Trash size={15} />
        Delete note
      </div>
      <div className="nav-button" onClick={downloadNoteHandler}>
        <Download size={15} />
        Download note
      </div>
    </nav>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  activeCategoryId: state.noteState.activeCategoryId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendNoteToTrash: (noteId: string) => dispatch(sendNoteToTrash(noteId)),
  toggleFavoriteNote: (noteId: string) => dispatch(toggleFavoriteNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOptions)
