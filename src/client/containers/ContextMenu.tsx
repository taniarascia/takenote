import ReactDOM from 'react-dom'
import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContextMenuOptions } from '@/containers/ContextMenuOptions'
import { addCategoryToNote, swapCategory, swapNote } from '@/slices/note'
import { NoteItem, CategoryItem } from '@/types'
import { getNotes, getCategories, getSettings } from '@/selectors'
import { ContextMenuEnum } from '@/utils/enums'
import { determineTheme } from '@/utils/helpers'

export const MenuUtilitiesContext = createContext({
  setOptionsId: (id: string) => {},
})
interface Position {
  x: number
  y: number
}

export interface ContextMenuProps {
  item: NoteItem | CategoryItem
  optionsPosition: Position
  contextMenuRef: React.RefObject<HTMLDivElement> | null
  setOptionsId: (id: string) => void
  type: ContextMenuEnum
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  item,
  optionsPosition,
  contextMenuRef,
  setOptionsId,
  type,
}) => {
  const { darkTheme } = useSelector(getSettings)

  const [elementDimensions, setElementDimensions] = useState<{
    offsetHeight: number | null
    offsetWidth: number | null
  }>({ offsetHeight: null, offsetWidth: null })

  useEffect(() => {
    if (contextMenuRef?.current) {
      const { offsetHeight, offsetWidth } = contextMenuRef.current
      setElementDimensions({ offsetHeight, offsetWidth })
    }
  }, [contextMenuRef])

  const getOptionsYPosition = (): Number => {
    if (elementDimensions.offsetHeight || elementDimensions.offsetWidth) {
      // get the max window frame
      const MaxY = window.innerHeight
      const optionsSize = elementDimensions.offsetHeight as number

      // if window position - noteOptions position isn't bigger than options, flip it.
      return MaxY - optionsPosition.y > optionsSize
        ? optionsPosition.y
        : optionsPosition.y - optionsSize
    }

    return 0
  }

  const contextValues = {
    setOptionsId,
  }

  return ReactDOM.createPortal(
    <div className={determineTheme(darkTheme, '')}>
      <div
        ref={contextMenuRef}
        className="options-context-menu"
        style={{
          visibility: getOptionsYPosition() ? 'visible' : 'hidden',
          position: 'absolute',
          top: getOptionsYPosition() + 'px',
          left: optionsPosition.x + 'px',
        }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <MenuUtilitiesContext.Provider value={contextValues}>
          {type === ContextMenuEnum.CATEGORY ? (
            <CategoryMenu category={item as CategoryItem} />
          ) : (
            <NotesMenu note={item as NoteItem} setOptionsId={setOptionsId} />
          )}
        </MenuUtilitiesContext.Provider>
      </div>
    </div>,
    document.getElementById('context-menu') as HTMLElement
  )
}

interface CategoryMenuProps {
  category: CategoryItem
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ category }) => {
  return <ContextMenuOptions clickedItem={category} type={ContextMenuEnum.CATEGORY} />
}

interface NotesMenuProps {
  note: NoteItem
  setOptionsId: (id: string) => void
}

const NotesMenu: React.FC<NotesMenuProps> = ({ note, setOptionsId }) => {
  const { categories } = useSelector(getCategories)
  const { activeCategoryId } = useSelector(getNotes)

  const dispatch = useDispatch()
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

  const filteredCategories = categories.filter(({ id }) => id !== activeCategoryId)
  return (
    <>
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

              setOptionsId('')
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
      <ContextMenuOptions type={ContextMenuEnum.NOTE} clickedItem={note} />
    </>
  )
}
