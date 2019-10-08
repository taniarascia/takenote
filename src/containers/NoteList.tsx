import React, { useState, useEffect, useRef } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { swapNote, swapCategory, pruneNotes, addCategoryToNote } from 'actions'
import { NoteItem, CategoryItem, ApplicationState } from 'types'
import { getNoteTitle } from 'helpers'

interface NoteListProps {
  activeCategoryId: string
  activeNoteId: string
  notes: NoteItem[]
  filteredNotes: NoteItem[]
  filteredCategories: CategoryItem[]
  swapNote: (noteId: string) => void
  swapCategory: (categoryId: string) => void
  pruneNotes: () => void
  addCategoryToNote: (categoryId: string, noteId: string) => void
}

const NoteList: React.FC<NoteListProps> = ({
  activeCategoryId,
  activeNoteId,
  notes,
  filteredNotes,
  filteredCategories,
  swapNote,
  swapCategory,
  pruneNotes,
  addCategoryToNote,
}) => {
  const [noteOptionsId, setNoteOptionsId] = useState('')
  const node = useRef<HTMLDivElement>(null)

  const handleNoteOptionsClick = (event, noteId: string = '') => {
    event.stopPropagation()

    if (node.current) {
      if (node.current.contains(event.target)) return
    }

    if (!noteOptionsId) {
      setNoteOptionsId(noteId)
    } else if (noteOptionsId !== noteId) {
      setNoteOptionsId(noteId)
    } else {
      setNoteOptionsId('')
    }
  }

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleNoteOptionsClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleNoteOptionsClick)
    }
  }, [])

  return (
    <aside className="note-sidebar">
      <div className="note-list">
        {filteredNotes.map(note => {
          const noteTitle: string = getNoteTitle(note.text)

          return (
            <div
              className={note.id === activeNoteId ? 'note-each active' : 'note-each'}
              key={note.id}
              onClick={() => {
                if (note.id !== activeNoteId) {
                  swapNote(note.id)
                  pruneNotes()
                }
              }}
            >
              <div>{noteTitle}</div>
              <div
                className={noteOptionsId === note.id ? 'note-options active ' : 'note-options'}
                onClick={event => handleNoteOptionsClick(event, note.id)}
              >
                ...
              </div>
              {noteOptionsId === note.id && (
                <div
                  ref={node}
                  className="note-options-context"
                  onClick={event => {
                    event.stopPropagation()
                  }}
                >
                  <h2>Move to category</h2>
                  <select
                    defaultValue=""
                    className="select-element"
                    onChange={event => {
                      addCategoryToNote(event.target.value, note.id)
                      const notesForNewCategory = notes.filter(
                        note => note.category === event.target.value
                      )
                      const newNoteId =
                        notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
                      if (event.target.value !== activeCategoryId) {
                        swapCategory(event.target.value)
                        swapNote(newNoteId)
                      }
                    }}
                  >
                    <option disabled value="">
                      Select category
                    </option>
                    {filteredCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  activeCategoryId: state.categoryState.activeCategoryId,
  activeNoteId: state.noteState.activeNoteId,
  notes: state.noteState.notes,
  filteredNotes: state.categoryState.activeCategoryId
    ? state.noteState.notes.filter(note => note.category === state.categoryState.activeCategoryId)
    : state.noteState.notes,
  filteredCategories: state.categoryState.categories.filter(
    category => category.id !== state.categoryState.activeCategoryId
  ),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
  pruneNotes: () => dispatch(pruneNotes()),
  addCategoryToNote: (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote(categoryId, noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
