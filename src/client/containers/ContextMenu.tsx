import ReactDOM from 'react-dom'
import React, { useEffect, useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SelectCategory } from '@/components/NoteList/SelectCategory'
import { ContextMenuOptions } from '@/containers/ContextMenuOptions'
import { addCategoryToNote, updateActiveCategoryId, updateActiveNote } from '@/slices/note'
import { NoteItem, CategoryItem } from '@/types'
import { getNotes, getCategories, getSettings } from '@/selectors'
import { ContextMenuEnum } from '@/utils/enums'

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
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { darkTheme } = useSelector(getSettings)

  // ===========================================================================
  // State
  // ===========================================================================

  const [elementDimensions, setElementDimensions] = useState<{
    offsetHeight: number | null
    offsetWidth: number | null
  }>({ offsetHeight: null, offsetWidth: null })

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    if (contextMenuRef?.current) {
      const { offsetHeight, offsetWidth } = contextMenuRef.current
      setElementDimensions({ offsetHeight, offsetWidth })
    }
  }, [contextMenuRef])

  // ===========================================================================
  // Other
  // ===========================================================================

  const contextValues = {
    setOptionsId,
  }

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

  return ReactDOM.createPortal(
    <div className={type === ContextMenuEnum.CATEGORY || darkTheme ? 'dark' : ''}>
      <div
        ref={contextMenuRef}
        className="options-context-menu"
        style={{
          visibility: getOptionsYPosition() ? 'visible' : 'hidden',
          position: 'absolute',
          top: getOptionsYPosition() + 'px',
          left: optionsPosition.x + 'px',
        }}
        onClick={(event) => {
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
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { categories } = useSelector(getCategories)
  const { activeCategoryId } = useSelector(getNotes)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))
  const _updateActiveCategoryId = (categoryId: string) =>
    dispatch(updateActiveCategoryId(categoryId))

  return (
    <>
      {!note.scratchpad && (
        <SelectCategory
          onChange={(event) => {
            _addCategoryToNote(event.target.value, note.id)

            if (event.target.value !== activeCategoryId) {
              _updateActiveCategoryId(event.target.value)
              _updateActiveNote(note.id, false)
            }

            setOptionsId('')
          }}
          categories={categories}
          activeCategoryId={activeCategoryId}
          note={note}
        />
      )}

      <ContextMenuOptions type={ContextMenuEnum.NOTE} clickedItem={note} />
    </>
  )
}
