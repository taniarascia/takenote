import React from 'react'

import { Select } from '../Select'

import { notesSortOptions } from '@/utils/constants'
import { NotesSortKey } from '@/utils/enums'

export interface SortByOptionProps {
  onChange: (selectedOption: any) => void
  currentSortOptionValue: NotesSortKey
}

export const NotesSortByOption: React.FC<SortByOptionProps> = ({
  onChange,
  currentSortOptionValue,
}) => {
  return (
    <div className="settings-options">
      <div>Sort By</div>
      <Select
        options={notesSortOptions}
        onChange={onChange}
        selectedValue={currentSortOptionValue}
      />
    </div>
  )
}
