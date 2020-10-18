import React from 'react'
import { Plus } from 'react-feather'

import { iconColor } from '@/utils/constants'

export interface AddCategoryButtonProps {
  dataTestID: string
  handler: (adding: boolean) => void
  label: string
}

export const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({
  dataTestID,
  handler,
  label,
}) => {
  return (
    <button
      data-testid={dataTestID}
      className="category-button"
      onClick={() => handler(true)}
      aria-label={label}
    >
      <Plus size={16} color={iconColor} />
    </button>
  )
}
