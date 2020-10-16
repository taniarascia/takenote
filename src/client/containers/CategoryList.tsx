import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { Droppable } from 'react-beautiful-dnd'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'
import { CategoryOption } from '@/containers/CategoryOption'
import { getCategories } from '@/selectors'
import { shouldOpenContextMenu } from '@/utils/helpers'
import { ReactMouseEvent, ReactSubmitEvent, CategoryItem } from '@/types'
import { useTempState } from '@/contexts/TempStateContext'
import { setCategoryEdit, updateCategory, addCategory } from '@/slices/category'
import { AddCategoryForm } from '@/components/AppSidebar/AddCategoryForm'
import { AddCategoryButton } from '@/components/AppSidebar/AddCategoryButton'

export const CategoryList: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    categories,
    editingCategory: { id: editingCategoryId, tempName: tempCategoryName },
  } = useSelector(getCategories)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))
  const _updateCategory = (category: CategoryItem) => dispatch(updateCategory(category))
  const _addCategory = (category: CategoryItem) => dispatch(addCategory(category))

  // ===========================================================================
  // Refs
  // ===========================================================================

  const contextMenuRef = useRef<HTMLDivElement>(null)

  // ===========================================================================
  // State
  // ===========================================================================

  const [optionsId, setOptionsId] = useState('')
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 })

  // ===========================================================================
  // Context
  // ===========================================================================

  const { addingTempCategory, setAddingTempCategory } = useTempState()

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleCategoryMenuClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId: string = ''
  ) => {
    const clicked = event.target

    // Make sure we aren't getting any null values .. any element clicked should be a sub-class of element
    if (!clicked) return

    if (shouldOpenContextMenu(clicked as Element)) {
      if ('clientX' in event && 'clientY' in event) {
        setOptionsPosition({ x: event.clientX, y: event.clientY })
      }
    }

    event.stopPropagation()

    if (contextMenuRef?.current?.contains(clicked as HTMLDivElement)) {
    } else {
      setOptionsId(!optionsId || optionsId !== categoryId ? categoryId : '')
    }
  }

  const handleCategoryRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId: string = ''
  ) => {
    event.preventDefault()
    handleCategoryMenuClick(event, categoryId)
  }

  const resetTempCategory = () => {
    setAddingTempCategory(false)
    _setCategoryEdit('', '')
  }

  const onSubmitUpdateCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: editingCategoryId, name: tempCategoryName.trim(), draggedOver: false }

    if (categories.find((cat) => cat.name === category.name) || category.name === '') {
      resetTempCategory()
    } else {
      _updateCategory(category)
      resetTempCategory()
    }
  }

  const onSubmitNewCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: uuid(), name: tempCategoryName.trim(), draggedOver: false }

    if (categories.find((cat) => cat.name === category.name) || category.name === '') {
      resetTempCategory()
    } else {
      _addCategory(category)
      resetTempCategory()
    }
  }

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    document.addEventListener('mousedown', handleCategoryMenuClick)

    return () => {
      document.removeEventListener('mousedown', handleCategoryMenuClick)
    }
  })

  return (
    <>
      <Droppable type="CATEGORY" droppableId="Category list">
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="category-list"
            aria-label="Category list"
          >
            {categories.map((category, index) => (
              <CategoryOption
                key={category.id}
                index={index}
                category={category}
                contextMenuRef={contextMenuRef}
                handleCategoryMenuClick={handleCategoryMenuClick}
                handleCategoryRightClick={handleCategoryRightClick}
                onSubmitUpdateCategory={onSubmitUpdateCategory}
                optionsId={optionsId}
                setOptionsId={setOptionsId}
                optionsPosition={optionsPosition}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      {addingTempCategory ? (
        <AddCategoryForm
          dataTestID={TestID.NEW_CATEGORY_FORM}
          submitHandler={onSubmitNewCategory}
          changeHandler={_setCategoryEdit}
          resetHandler={resetTempCategory}
          editingCategoryId={editingCategoryId}
          tempCategoryName={tempCategoryName}
        />
      ) : (
        <AddCategoryButton
          dataTestID={TestID.ADD_CATEGORY_BUTTON}
          handler={setAddingTempCategory}
          label={LabelText.ADD_CATEGORY}
        />
      )}
    </>
  )
}
