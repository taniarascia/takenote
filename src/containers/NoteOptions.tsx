import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ArrowUp, Bookmark, Download, Trash } from 'react-feather'

import { toggleFavoriteNote, toggleTrashedNote } from 'actions'
import { downloadNote, getNoteTitle } from 'helpers'
import { ApplicationState, NoteItem } from 'types'

export interface NoteOptionsProps {
  clickedNote: NoteItem
  toggleTrashedNote: (noteId: string) => void
  toggleFavoriteNote: (noteId: string) => void
}

const NoteOptions: React.FC<NoteOptionsProps> = ({
  clickedNote,
  toggleTrashedNote,
  toggleFavoriteNote,
}) => {
  const trashNoteHandler = () => {
    toggleTrashedNote(clickedNote.id)
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
        {clickedNote.trash ? (
          <>
            <ArrowUp size={15} />
            Restore from trash
          </>
        ) : (
          <>
            <Trash size={15} />
            Move to trash
          </>
        )}
      </div>
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
  toggleTrashedNote: (noteId: string) => dispatch(toggleTrashedNote(noteId)),
  toggleFavoriteNote: (noteId: string) => dispatch(toggleFavoriteNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOptions)
