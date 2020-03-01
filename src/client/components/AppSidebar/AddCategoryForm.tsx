import React from 'react'

import { TestIDEnum } from '@resources/TestIDEnum'

import { ReactSubmitEvent } from '@/types'

export interface AddCategoryFormProps {
  dataTestID: string
  submitHandler: (event: ReactSubmitEvent) => void
  changeHandler: (editingCategoryId: string, value: string) => void
  resetHandler: () => void
  editingCategoryId: string
  tempCategoryName: string
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  dataTestID,
  submitHandler,
  changeHandler,
  resetHandler,
  editingCategoryId,
  tempCategoryName,
}) => {
  return (
    <form data-testid={dataTestID} className="category-form" onSubmit={submitHandler}>
      <input
        data-testid={TestIDEnum.NEW_CATEGORY_FORM}
        aria-label="Category name"
        type="text"
        autoFocus
        maxLength={20}
        placeholder="New category..."
        onChange={event => {
          changeHandler(editingCategoryId, event.target.value)
        }}
        onBlur={event => {
          if (!tempCategoryName || tempCategoryName.trim() === '') {
            resetHandler()
          } else {
            submitHandler(event)
          }
        }}
      />
    </form>
  )
}
