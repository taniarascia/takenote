import React, { useEffect, useRef, useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { MoreHorizontal } from 'react-feather'

import { Folder } from 'constants/enums'
import { folderMap } from 'constants/index'
import NoteOptions from 'containers/NoteOptions'
import { getNoteTitle, sortByLastUpdated } from 'helpers'
import { addCategoryToNote, pruneNotes, swapCategory, swapNote } from 'slices/noteSlice'
import { ApplicationState, CategoryItem, NoteItem } from 'types'

interface NoteListProps {
  activeFolder: Folder
  activeCategoryId: string
  activeCategory?: CategoryItem
  activeNoteId: string
  filteredNotes: NoteItem[]
  filteredCategories: CategoryItem[]
  swapNote: (noteId: string) => void
  swapCategory: (categoryId: string) => void
  pruneNotes: () => void
  addCategoryToNote: (categoryId: string, noteId: string) => void
}

const NoteList: React.FC<NoteListProps> = ({
  activeFolder,
  activeCategoryId,
  activeCategory,
  activeNoteId,
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

const mapStateToProps = (state: ApplicationState) => {
  const {
    noteState: { activeCategoryId, activeFolder, activeNoteId, notes },
    categoryState: { categories },
  } = state

  const filter: Record<Folder, (note: NoteItem) => boolean | undefined> = {
    [Folder.CATEGORY]: note => !note.trash && note.category === activeCategoryId,
    [Folder.FAVORITES]: note => !note.trash && note.favorite,
    [Folder.TRASH]: note => note.trash,
    [Folder.ALL]: note => !note.trash,
  }
  const filteredNotes: NoteItem[] = notes.filter(filter[activeFolder])

  filteredNotes.sort(sortByLastUpdated)

  return {
    activeCategory: categories.find(({ id }) => id === activeCategoryId),
    activeCategoryId,
    activeFolder,
    activeNoteId,
    filteredCategories: categories.filter(({ id }) => id !== activeCategoryId),
    filteredNotes,
    notes,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCategoryToNote: (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId })),
  pruneNotes: () => dispatch(pruneNotes()),
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
