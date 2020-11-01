import React from 'react'
import { ChevronDown, ChevronRight, Layers } from 'react-feather'

export interface CollapseCategoryListButton {
  dataTestID: string
  handler: () => void
  label: string
  isCategoryListOpen: boolean
  showIcon: boolean
}

export const CollapseCategoryListButton: React.FC<CollapseCategoryListButton> = ({
  dataTestID,
  handler,
  label,
  isCategoryListOpen,
  showIcon,
}) => {
  return (
    <button
      data-testid={dataTestID}
      className="collapse-button"
      onClick={handler}
      aria-label={label}
    >
      {showIcon ? (
        isCategoryListOpen ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )
      ) : (
        <Layers size={16} />
      )}
      <h2>Categories</h2>
    </button>
  )
}
