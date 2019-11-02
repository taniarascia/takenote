import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Star, Menu, Plus } from 'react-feather'
import _ from 'lodash'

import { Folder } from 'constants/enums'
import NoteListButton from 'components/NoteListButton'
import NoteOptions from 'containers/NoteOptions'
import { useTempState } from 'contexts/TempStateContext'
import { getNoteTitle, sortByLastUpdated, sortByFavourites, newNote } from 'helpers'
import {
  addCategoryToNote,
  emptyTrash,
  pruneNotes,
  swapCategory,
  swapNote,
  addNote,
  searchNotes,
} from 'slices/note'
import { NoteItem, ReactDragEvent, ReactMouseEvent, RootState } from 'types'

const NoteList: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes, searchValue } = useSelector(
    (state: RootState) => state.noteState
  )

  const re = new RegExp(_.escapeRegExp(searchValue), 'i')
  const isMatch = (result: NoteItem) => re.test(result.text)

  const filter: Record<Folder, (note: NoteItem) => boolean> = {
    [Folder.CATEGORY]: note => !note.trash && note.category === activeCategoryId,
    [Folder.FAVORITES]: note => !note.trash && !!note.favorite,
    [Folder.TRASH]: note => !!note.trash,
    [Folder.ALL]: note => !note.trash,
  }
  const filteredNotes: NoteItem[] = notes
    .filter(filter[activeFolder])
    .filter(isMatch)
    .sort(sortByLastUpdated)
    .sort(sortByFavourites)
  const filteredCategories = categories.filter(({ id }) => id !== activeCategoryId)

  const dispatch = useDispatch()

  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _emptyTrash = () => dispatch(emptyTrash())
  const _pruneNotes = () => dispatch(pruneNotes())
  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))
  const _searchNotes = _.debounce((searchValue: string) => dispatch(searchNotes(searchValue)), 200)

  const { navOpen, setNavOpen, noteOpen, setNoteOpen } = useTempState()
  const activeNote = notes.find(note => note.id === activeNoteId)

  const [noteOptionsId, setNoteOptionsId] = useState('')
  const [noteOptionsPosition, setNoteOptionsPosition] = useState({ x: 0, y: 0 })
  const node = useRef<HTMLDivElement>(null)

  const handleNoteOptionsClick = (event: ReactMouseEvent, noteId: string = '') => {
    if (
      event instanceof MouseEvent &&
      (event.target instanceof Element || event.target instanceof SVGElement)
    ) {
      if (event.target.classList.contains('note-options')) {
        setNoteOptionsPosition({ x: event.pageX, y: event.pageY })
      }
      if (event.target.parentElement instanceof Element) {
        if (event.target.parentElement.classList.contains('note-options')) {
          setNoteOptionsPosition({ x: event.pageX, y: event.pageY })
        }
      }
    }
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return
    setNoteOptionsId(!noteOptionsId || noteOptionsId !== noteId ? noteId : '')
  }

  const handleDragStart = (event: ReactDragEvent, noteId: string = '') => {
    event.stopPropagation()

    event.dataTransfer.setData('text/plain', noteId)
  }

  const getOptionsYPoisition = (): Number => {
    // get the max window frame
    const MaxY = window.innerHeight

    // determine approximate options height based on root font-size of 15px, padding, and select box.
    const optionsSize = 15 * 11

    // if window position - noteOptions position isn't ibgger than options. flip it.
    return MaxY - noteOptionsPosition.y > optionsSize
      ? noteOptionsPosition.y
      : noteOptionsPosition.y - optionsSize
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleNoteOptionsClick)
    return () => {
      document.removeEventListener('mousedown', handleNoteOptionsClick)
    }
  })

  const newNoteHandler = () => {
    const note = newNote(activeCategoryId, activeFolder)

    if ((activeNote && activeNote.text !== '' && !activeNote.trash) || !activeNote) {
      _addNote(note)
      _swapNote(note.id)
    }
  }

  const showEmptyTrash = activeFolder === Folder.TRASH && filteredNotes.length > 0

  return (
    <aside className={`note-sidebar ${noteOpen ? 'note-open' : ''}`}>
      <div className="note-sidebar-header">
        <div className="mobile-sidebar-options">
          <button
            className="toggle-mobile-nav"
            onClick={() => {
              setNavOpen(!navOpen)
            }}
          >
            <Menu />
          </button>
          <input
            type="search"
            onChange={event => {
              event.preventDefault()
              _searchNotes(event.target.value)
            }}
            placeholder="Search for notes"
          />
        </div>
        {showEmptyTrash && (
          <NoteListButton label="Empty Trash" handler={() => _emptyTrash()}>
            Empty Trash
          </NoteListButton>
        )}
      </div>
      <div className="note-list">
        {filteredNotes.map(note => {
          let noteTitle: string | React.ReactElement = getNoteTitle(note.text)

          if (searchValue) {
            const highlightStart = noteTitle.search(re)

            if (highlightStart !== -1) {
              const highlightEnd = highlightStart + searchValue.length
              noteTitle = (
                <>
                  {noteTitle.slice(0, highlightStart)}
                  <strong className="highlighted">
                    {noteTitle.slice(highlightStart, highlightEnd)}
                  </strong>
                  {noteTitle.slice(highlightEnd)}
                </>
              )
            }
          }

          return (
            <div
              className={note.id === activeNoteId ? 'note-list-each active' : 'note-list-each'}
              key={note.id}
              onClick={() => {
                setNoteOpen(true)
                if (note.id !== activeNoteId) {
                  _swapNote(note.id)
                  _pruneNotes()
                }
              }}
              draggable
              onDragStart={event => handleDragStart(event, note.id)}
            >
              <div className="note-title">
                {note.favorite ? (
                  <>
                    <div className="icon">
                      <Star className="note-favorite" size={12} />
                    </div>
                    <div> {noteTitle}</div>
                  </>
                ) : (
                  <>
                    <div className="icon"></div>
                    <div> {noteTitle}</div>
                  </>
                )}
              </div>
              <div
                className={noteOptionsId === note.id ? 'note-options active ' : 'note-options'}
                onClick={event => handleNoteOptionsClick(event, note.id)}
              >
                <MoreHorizontal size={15} />
              </div>
              {noteOptionsId === note.id && (
                <div
                  ref={node}
                  className="note-options-context-menu"
                  style={{
                    position: 'absolute',
                    top: getOptionsYPoisition() + 'px',
                    left: noteOptionsPosition.x + 'px',
                  }}
                  onClick={event => {
                    event.stopPropagation()
                  }}
                >
                  {!note.trash && filteredCategories.length > 0 && (
                    <>
                      <select
                        defaultValue=""
                        className="select"
                        onChange={event => {
                          _addCategoryToNote(event.target.value, note.id)

                          if (event.target.value !== activeCategoryId) {
                            _swapCategory(event.target.value)
                            _swapNote(note.id)
                          }

                          setNoteOptionsId('')
                        }}
                      >
                        <option disabled value="">
                          Move to category...
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
                    </>
                  )}
                  <NoteOptions clickedNote={note} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mobile-add-note">
        <button
          onClick={() => {
            setNoteOpen(true)
            newNoteHandler()
          }}
        >
          <Plus />
        </button>
      </div>
    </aside>
  )
}

export default NoteList
