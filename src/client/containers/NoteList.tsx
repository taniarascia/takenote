import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Star } from 'react-feather'
import _ from 'lodash'

import { Folder } from '@/constants/enums'
import NoteListButton from '@/components/NoteListButton'
import NoteOptions from '@/containers/NoteOptions'
import { getNoteTitle, sortByLastUpdated, sortByFavourites } from '@/helpers'
import { useKey } from '@/helpers/hooks'
import {
  addCategoryToNote,
  emptyTrash,
  pruneNotes,
  swapCategory,
  swapNote,
  searchNotes,
} from '@/slices/note'
import { NoteItem, ReactDragEvent, ReactMouseEvent, RootState } from '@/types'

const NoteList: React.FC = () => {
  const searchRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
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
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))
  const _searchNotes = _.debounce((searchValue: string) => dispatch(searchNotes(searchValue)), 100)

  const [noteOptionsId, setNoteOptionsId] = useState('')
  const [noteOptionsPosition, setNoteOptionsPosition] = useState({ x: 0, y: 0 })
  const node = useRef<HTMLDivElement>(null)

  const handleNoteOptionsClick = (event: ReactMouseEvent, noteId: string = '') => {
    // make sure we aren't getting any null values .. any element clicked should be a sub-class of element
    if (
      event.target instanceof Element &&
      (event.target.classList.contains('note-options') || event.target instanceof SVGElement)
    ) {
      // make sure we have the necessary variables
      // note: don't check for MouseEvent because Cypress MouseEvent !== Window.MouseEvent
      if ('pageX' in event && 'pageY' in event) {
        setNoteOptionsPosition({ x: event.pageX, y: event.pageY })
      }
    }

    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) {
      return
    } else {
      setNoteOptionsId(!noteOptionsId || noteOptionsId !== noteId ? noteId : '')
    }
  }

  const handleDragStart = (event: ReactDragEvent, noteId: string = '') => {
    event.stopPropagation()

    event.dataTransfer.setData('text/plain', noteId)
  }

  const getOptionsYPosition = (): Number => {
    // get the max window frame
    const MaxY = window.innerHeight

    // determine approximate options height based on root font-size of 15px, padding, and select box.
    const optionsSize = 15 * 11

    // if window position - noteOptions position isn't bigger than options, flip it.
    return MaxY - noteOptionsPosition.y > optionsSize
      ? noteOptionsPosition.y
      : noteOptionsPosition.y - optionsSize
  }

  const focusSearch = () => {
    searchRef.current.focus()
  }

  useKey('alt+ctrl+f', () => {
    focusSearch()
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleNoteOptionsClick)
    return () => {
      document.removeEventListener('mousedown', handleNoteOptionsClick)
    }
  })

  const showEmptyTrash = activeFolder === Folder.TRASH && filteredNotes.length > 0

  return (
    <aside className="note-sidebar">
      <div className="note-sidebar-header">
        <input
          data-testid="note-search"
          className="note-search"
          ref={searchRef}
          type="search"
          onChange={event => {
            event.preventDefault()
            _searchNotes(event.target.value)
          }}
          placeholder="Search for notes"
        />
        {showEmptyTrash && (
          <NoteListButton
            dataTestID="empty-trash-button"
            label="Empty Trash"
            handler={() => _emptyTrash()}
          >
            Empty Trash
          </NoteListButton>
        )}
      </div>
      <div
        data-testid="note-list"
        className="note-list"
        style={{ marginTop: showEmptyTrash ? '103px' : '60px' }}
      >
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

          const activeNote: boolean = note.id === activeNoteId

          const activeOrInactiveTestIDQualifier: string = activeNote
            ? 'active-note'
            : 'inactive-note'

          return (
            <div
              data-testid={activeOrInactiveTestIDQualifier}
              className={note.id === activeNoteId ? 'note-list-each active' : 'note-list-each'}
              key={note.id}
              onClick={() => {
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
                    <div className="icon" />
                    <div> {noteTitle}</div>
                  </>
                )}
              </div>
              <div
                // TODO: make testID based off of index when we add that to a NoteItem object
                data-testid={'note-options-div-' + activeOrInactiveTestIDQualifier}
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
                    top: getOptionsYPosition() + 'px',
                    left: noteOptionsPosition.x + 'px',
                  }}
                  onClick={event => {
                    event.stopPropagation()
                  }}
                >
                  {!note.trash && filteredCategories.length > 0 && (
                    <>
                      <select
                        data-testid="note-options-move-to-category-select"
                        defaultValue=""
                        className="move-to-category-select"
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
    </aside>
  )
}

export default NoteList
