import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Star } from 'react-feather'
import _ from 'lodash'

import { Folder, Shortcuts, ContextMenuEnum } from '@/utils/enums'
import { NoteListButton } from '@/components/NoteList/NoteListButton'
import { SearchBar } from '@/components/NoteList/SearchBar'
import { ContextMenu } from '@/containers/ContextMenu'
import {
  getNoteTitle,
  sortByLastUpdated,
  sortByFavorites,
  shouldOpenContextMenu,
} from '@/utils/helpers'
import { useKey } from '@/utils/hooks'
import { emptyTrash, pruneNotes, swapNote, searchNotes } from '@/slices/note'
import { NoteItem, ReactDragEvent, ReactMouseEvent } from '@/types'
import { getNotes } from '@/selectors'

export const NoteList: React.FC = () => {
  const { activeCategoryId, activeFolder, activeNoteId, notes, searchValue } = useSelector(getNotes)

  const contextMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  const dispatch = useDispatch()
  const _emptyTrash = () => dispatch(emptyTrash())
  const _pruneNotes = () => dispatch(pruneNotes())
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _searchNotes = _.debounce((searchValue: string) => dispatch(searchNotes(searchValue)), 100)

  const re = new RegExp(_.escapeRegExp(searchValue), 'i')
  const isMatch = (result: NoteItem) => re.test(result.text)

  const [optionsId, setOptionsId] = useState('')
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 })

  const filter: Record<Folder, (note: NoteItem) => boolean> = {
    [Folder.CATEGORY]: note => !note.trash && note.category === activeCategoryId,
    [Folder.SCRATCHPAD]: note => !!note.scratchpad,
    [Folder.FAVORITES]: note => !note.trash && !!note.favorite,
    [Folder.TRASH]: note => !!note.trash,
    [Folder.ALL]: note => !note.trash && !note.scratchpad,
  }
  const filteredNotes: NoteItem[] = notes
    .filter(filter[activeFolder])
    .filter(isMatch)
    .sort(sortByLastUpdated)
    .sort(sortByFavorites)

  const handleDragStart = (event: ReactDragEvent, noteId: string = '') => {
    event.stopPropagation()

    event.dataTransfer.setData('text/plain', noteId)
  }

  const focusSearch = () => searchRef.current.focus()
  useKey(Shortcuts.SEARCH, () => focusSearch())

  useEffect(() => {
    document.addEventListener('mousedown', handleNoteOptionsClick)
    return () => {
      document.removeEventListener('mousedown', handleNoteOptionsClick)
    }
  })

  const handleNoteOptionsClick = (event: ReactMouseEvent, noteId: string = '') => {
    const clicked = event.target

    // Make sure we aren't getting any null values .. any element clicked should be a sub-class of element
    if (!clicked) return

    // Ensure the clicked target is supposed to open the context menu
    if (shouldOpenContextMenu(clicked as Element)) {
      // note: don't check for MouseEvent because Cypress MouseEvent !== Window.MouseEvent
      if ('pageX' in event && 'pageY' in event) {
        setOptionsPosition({ x: event.pageX, y: event.pageY })
      }
    }

    event.stopPropagation()

    if (contextMenuRef.current && contextMenuRef.current.contains(clicked as HTMLDivElement)) {
      return
    } else {
      setOptionsId(!optionsId || optionsId !== noteId ? noteId : '')
    }
  }

  const handleNoteRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    noteId: string = ''
  ) => {
    event.preventDefault()
    const clicked = event.target
    const RIGHT_CLICK = 2

    // Make sure we aren't getting any null values .. any element clicked should be a sub-class of element
    if (!clicked) return

    // Make sure we are not right clicking on the menu
    if (optionsId && event.button == RIGHT_CLICK) return

    if ('clientX' in event && 'clientY' in event) {
      setOptionsPosition({ x: event.clientX, y: event.clientY })
    }

    event.stopPropagation()

    if (contextMenuRef.current && contextMenuRef.current.contains(clicked as HTMLDivElement)) {
      return
    } else {
      setOptionsId(!optionsId || optionsId !== noteId ? noteId : '')
    }
  }

  const showEmptyTrash = activeFolder === Folder.TRASH && filteredNotes.length > 0

  return activeFolder !== Folder.SCRATCHPAD ? (
    <aside className="note-sidebar">
      <div className="note-sidebar-header">
        <SearchBar searchRef={searchRef} searchNotes={_searchNotes} />
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
        {filteredNotes.map((note: NoteItem, index: number) => {
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
              data-testid={'note-list-item-' + index}
              className={note.id === activeNoteId ? 'note-list-each active' : 'note-list-each'}
              key={note.id}
              onClick={() => {
                if (note.id !== activeNoteId) {
                  _swapNote(note.id)
                  _pruneNotes()
                }
              }}
              onContextMenu={event => handleNoteRightClick(event, note.id)}
              draggable
              onDragStart={event => handleDragStart(event, note.id)}
            >
              <div data-testid={'note-title-' + index} className="note-title">
                {note.favorite ? (
                  <>
                    <div className="icon">
                      <Star className="note-favorite" size={12} />
                    </div>
                    <div className="truncate-text"> {noteTitle}</div>
                  </>
                ) : (
                  <>
                    <div className="icon" />
                    <div className="truncate-text"> {noteTitle}</div>
                  </>
                )}
              </div>
              <div
                // TODO: make testID based off of index when we add that to a NoteItem object
                data-testid={'note-options-div-' + index}
                className={
                  optionsId === note.id
                    ? 'note-options context-menu-action active '
                    : 'note-options context-menu-action'
                }
                onClick={event => handleNoteOptionsClick(event, note.id)}
              >
                <MoreHorizontal size={15} className="context-menu-action" />
              </div>
              {optionsId === note.id && (
                <ContextMenu
                  contextMenuRef={contextMenuRef}
                  item={note}
                  optionsPosition={optionsPosition}
                  setOptionsId={setOptionsId}
                  type={ContextMenuEnum.NOTE}
                />
              )}
            </div>
          )
        })}
      </div>
    </aside>
  ) : null
}
