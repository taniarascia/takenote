import React from 'react'

import { TestID } from '@resources/TestID'
import { NoteItem, CategoryItem } from '@/types'
import { isDraftNote } from '@/utils/helpers'

export interface SelectCategoryProps {
  onChange: (selectedOption: any) => void
  categories: CategoryItem[]
  note: NoteItem
  activeCategoryId: string
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({
  onChange,
  categories,
  note,
  activeCategoryId,
}) => {
  const filteredCategories = categories
    .filter(({ id }) => id !== activeCategoryId)
    .filter((category) => category.id !== note.category)

  return (
    <>
      {!note.trash && !isDraftNote(note) && filteredCategories.length > 0 && (
        <select
          data-testid={TestID.MOVE_TO_CATEGORY}
          defaultValue=""
          className="nav-item move-to-category-select"
          onChange={onChange}
        >
          <option disabled value="">
            Move to category...
          </option>
          {filteredCategories
            .filter((category) => category.id !== note.category)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      )}
    </>
  )
}
