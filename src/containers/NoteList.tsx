import React, { useState, useEffect, useRef } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { PlusCircle } from 'react-feather'
import uuid from 'uuid/v4'
import moment from 'moment'
import { Folders } from 'constants/enums'
import { addNote, swapNote, swapCategory, pruneNotes, addCategoryToNote } from 'actions'
import { NoteItem, CategoryItem, ApplicationState } from 'types'
import { getNoteTitle } from 'helpers'
import NoteOptions from 'containers/NoteOptions'

interface NoteListProps {
  activeNote?: NoteItem
  addNote: (note: NoteItem) => void
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
  addNote,
  activeCategoryId,
  activeNote,
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

  const handleNoteOptionsClick = (
    event: MouseEvent | React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLSelectElement>,
    noteId: string = ''
  ) => {
    event.stopPropagation()

    if (node.current) {
      if (node.current.contains(event.target as HTMLDivElement)) return
    }

    if (!noteOptionsId) {
      setNoteOptionsId(noteId)
    } else if (noteOptionsId !== noteId) {
      setNoteOptionsId(noteId)
    } else {
      setNoteOptionsId('')
    }
  }

  const newNoteHandler = () => {
    const note: NoteItem = {
      id: uuid(),
      text: '',
      created: moment().format(),
      lastUpdated: moment().format(),
      category: activeCategoryId ? activeCategoryId : undefined,
    }

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const searchNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredResults = filteredNotes.filter(
      note => note.text.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    )
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
      {/* <input
        type="search"
        placeholder="Search notes"
        onChange={searchNotes}
        className="searchbar"
      /> */}
      <div className="add-note">
        <div>
          <PlusCircle size={20} onClick={newNoteHandler} />
        </div>
      </div>
      <div className="note-list">
        {filteredNotes.map(note => {
          const noteTitle = getNoteTitle(note.text)

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

                      if (event.target.value !== activeCategoryId) {
                        swapCategory(event.target.value)
                        swapNote(note.id)
                      }

                      setNoteOptionsId('')
                    }}
                  >
                    <option disabled value="">
                      Select category
                    </option>
                    {filteredCategories
                      .filter(category => category.id !== note.category)
                      .map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    {note.category && (
                      <option key="none" value="">
                        Remove category
                      </option>
                    )}
                  </select>
                  <NoteOptions />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  const { noteState, categoryState } = state

  let filteredNotes: NoteItem[] = []

  if (noteState.activeFolder === Folders.CATEGORY) {
    filteredNotes = noteState.notes.filter(
      note => !note.trash && note.category === noteState.activeCategoryId
    )
  } else if (noteState.activeFolder === Folders.TRASH) {
    filteredNotes = noteState.notes.filter(note => note.trash)
  } else {
    filteredNotes = noteState.notes.filter(note => !note.trash)
  }

  return {
    activeCategoryId: noteState.activeCategoryId,
    activeNoteId: noteState.activeNoteId,
    notes: noteState.notes,
    filteredNotes,
    activeNote: state.noteState.notes.find(note => note.id === state.noteState.activeNoteId),
    filteredCategories: categoryState.categories.filter(
      category => category.id !== noteState.activeCategoryId
    ),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: (note: NoteItem) => dispatch(addNote(note)),
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
