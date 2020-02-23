/* eslint-disable import/no-unresolved */
import React from 'react'
import { Book } from 'react-feather'

import { ResourceStringEnum } from '@resources/resourceStrings'

import { Folder } from '@/constants/enums'
import { iconColor } from '@/constants/index'

export interface AllNotesOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const AllNotesOption: React.FC<AllNotesOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid="all-notes"
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.ALL)
      }}
    >
      <Book size={15} className="app-sidebar-icon" color={iconColor} />
      {ResourceStringEnum.ALL_NOTES}
    </div>
  )
}
