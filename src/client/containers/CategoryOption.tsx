import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Folder as FolderIcon, MoreHorizontal } from 'react-feather'

import { TestID } from '@resources/TestID'
import { CategoryItem, ReactDragEvent, ReactMouseEvent, ReactSubmitEvent } from '@/types'
import { determineCategoryClass } from '@/utils/helpers'
import { getNotes, getCategories } from '@/selectors'
import { updateActiveCategoryId, updateActiveNote, addCategoryToNote } from '@/slices/note'
import { setCategoryEdit, categoryDragLeave, categoryDragEnter } from '@/slices/category'
import { iconColor } from '@/utils/constants'
import { ContextMenuEnum } from '@/utils/enums'
import { ContextMenu } from '@/containers/ContextMenu'

interface CategoryOptionProps {
  category: CategoryItem
  index: number
  contextMenuRef: React.RefObject<HTMLDivElement>
  handleCategoryMenuClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId?: string
  ) => void
  handleCategoryRightClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId?: string
  ) => void
  onSubmitUpdateCategory: (event: ReactSubmitEvent) => void
  optionsPosition: { x: number; y: number }
  optionsId: string
  setOptionsId: React.Dispatch<React.SetStateAction<string>>
}

export const CategoryOption: React.FC<CategoryOptionProps> = ({
  category,
  index,
  contextMenuRef,
  handleCategoryMenuClick,
  handleCategoryRightClick,
  onSubmitUpdateCategory,
  optionsPosition,
  optionsId,
  setOptionsId,
}) => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { activeCategoryId, notes } = useSelector(getNotes)
  const {
    editingCategory: { id: editingCategoryId, tempName: tempCategoryName },
  } = useSelector(getCategories)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _updateActiveCategoryId = (categoryId: string) =>
    dispatch(updateActiveCategoryId(categoryId))
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))
  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _categoryDragEnter = (category: CategoryItem) => dispatch(categoryDragEnter(category))
  const _categoryDragLeave = (category: CategoryItem) => dispatch(categoryDragLeave(category))

  return (
    <Draggable draggableId={category.id} index={index}>
      {(draggableProvided, snapshot) => (
        <div
          {...draggableProvided.dragHandleProps}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          data-testid={TestID.CATEGORY_LIST_DIV}
          className={determineCategoryClass(category, snapshot.isDragging, activeCategoryId)}
          onClick={() => {
            const notesForNewCategory = notes.filter(
              (note) => !note.trash && note.category === category.id
            )
            const newNoteId = notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
            if (category.id !== activeCategoryId) {
              _updateActiveCategoryId(category.id)
              _updateActiveNote(newNoteId, false)
            }
          }}
          onDoubleClick={() => {
            _setCategoryEdit(category.id, category.name)
          }}
          onBlur={() => {
            _setCategoryEdit('', '')
          }}
          onDrop={(event) => {
            event.preventDefault()

            _addCategoryToNote(category.id, event.dataTransfer.getData('text'))
            _categoryDragLeave(category)
          }}
          onDragOver={(event: ReactDragEvent) => event.preventDefault()}
          onDragEnter={() => _categoryDragEnter(category)}
          onDragLeave={() => _categoryDragLeave(category)}
          onContextMenu={(event) => handleCategoryRightClick(event, category.id)}
        >
          <form
            className="category-list-name"
            onSubmit={(event) => {
              event.preventDefault()
              _setCategoryEdit('', '')
              onSubmitUpdateCategory(event)

              if (optionsId) setOptionsId('')
            }}
          >
            <FolderIcon size={15} className="app-sidebar-icon" color={iconColor} />
            {editingCategoryId === category.id ? (
              <input
                data-testid={TestID.CATEGORY_EDIT}
                className="category-edit"
                type="text"
                autoFocus
                maxLength={20}
                value={tempCategoryName}
                onChange={(event) => {
                  _setCategoryEdit(editingCategoryId, event.target.value)
                }}
                onBlur={(event) => onSubmitUpdateCategory(event)}
              />
            ) : (
              category.name
            )}
          </form>
          <div
            data-testid={TestID.MOVE_CATEGORY}
            className={optionsId === category.id ? 'category-options active' : 'category-options'}
            onClick={(event) => handleCategoryMenuClick(event, category.id)}
          >
            <MoreHorizontal size={15} className="context-menu-action" />
          </div>
          {optionsId === category.id && (
            <ContextMenu
              contextMenuRef={contextMenuRef}
              item={category}
              optionsPosition={optionsPosition}
              setOptionsId={setOptionsId}
              type={ContextMenuEnum.CATEGORY}
            />
          )}
        </div>
      )}
    </Draggable>
  )
}
