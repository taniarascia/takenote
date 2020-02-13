import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContextMenuOptions } from '@/containers/ContextMenuOptions'
import { addCategoryToNote, swapCategory, swapNote } from '@/slices/note'
import { NoteItem } from '@/types'
import { getNotes, getCategories } from '@/selectors'

interface Position {
  x: number
  y: number
}

export interface ContextMenuProps {
  note: NoteItem
  noteOptionsPosition: Position
  contextMenuRef: React.RefObject<HTMLDivElement> | null
  setNoteOptionsId: (id: string) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  note,
  noteOptionsPosition,
  contextMenuRef,
  setNoteOptionsId,
}) => {
  const { categories } = useSelector(getCategories)
  const { activeCategoryId } = useSelector(getNotes)

  const dispatch = useDispatch()
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

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

  const filteredCategories = categories.filter(({ id }) => id !== activeCategoryId)

  return (
    <div
      ref={contextMenuRef}
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
      <ContextMenuOptions clickedNote={note} />
    </div>
  )
}
