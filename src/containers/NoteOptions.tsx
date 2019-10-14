import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ArrowUp, Bookmark, Download, Trash } from 'react-feather'

import { toggleTrashedNote, toggleFavoriteNote } from 'actions'
import { NoteItem, ApplicationState } from 'types'
import { getNoteTitle, downloadNote } from 'helpers'

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
