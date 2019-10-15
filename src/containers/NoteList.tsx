import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal } from 'react-feather'

import { Folder } from 'constants/enums'
import { folderMap } from 'constants/index'
import NoteOptions from 'containers/NoteOptions'
import { getNoteTitle, sortByLastUpdated } from 'helpers'
import { addCategoryToNote, pruneNotes, swapCategory, swapNote } from 'slices/note'
import { RootState, NoteItem } from 'types'

const NoteList: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )

  const filter: Record<Folder, (note: NoteItem) => boolean> = {
    [Folder.CATEGORY]: note => !note.trash && note.category === activeCategoryId,
    [Folder.FAVORITES]: note => !note.trash && !!note.favorite,
    [Folder.TRASH]: note => !!note.trash,
    [Folder.ALL]: note => !note.trash,
  }
  const filteredNotes: NoteItem[] = notes.filter(filter[activeFolder]).sort(sortByLastUpdated)
  const activeCategory = categories.find(({ id }) => id === activeCategoryId)
  const filteredCategories = categories.filter(({ id }) => id !== activeCategoryId)

  const dispatch = useDispatch()

  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _pruneNotes = () => dispatch(pruneNotes())
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

  const [noteOptionsId, setNoteOptionsId] = useState('')
  const node = useRef<HTMLDivElement>(null)

  const handleNoteOptionsClick = (
    event: MouseEvent | React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLSelectElement>,
    noteId: string = ''
  ) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return
    setNoteOptionsId(!noteOptionsId || noteOptionsId !== noteId ? noteId : '')
  }

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleNoteOptionsClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleNoteOptionsClick)
    }
  })

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, noteId: string = '') => {
    event.stopPropagation()
    event.dataTransfer.setData('text/plain', noteId)
  }

  return (
    <aside className="note-sidebar">
      <div className="note-sidebar-header">
        {activeFolder === Folder.CATEGORY
          ? activeCategory && activeCategory.name
          : folderMap[activeFolder]}
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
                  _swapNote(note.id)
                  _pruneNotes()
                }
              }}
              draggable
              onDragStart={event => handleDragStart(event, note.id)}
            >
              <div>{noteTitle}</div>
              <div
                className={noteOptionsId === note.id ? 'note-options active ' : 'note-options'}
                onClick={event => handleNoteOptionsClick(event, note.id)}
              >
                <MoreHorizontal size={15} />
              </div>
              {noteOptionsId === note.id && (
                <div
                  ref={node}
                  className="note-options-context"
                  onClick={event => {
                    event.stopPropagation()
                  }}
                >
                  {!note.trash && (
                    <>
                      <h2>Move to category</h2>
                      <select
                        defaultValue=""
                        className="select-element"
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
