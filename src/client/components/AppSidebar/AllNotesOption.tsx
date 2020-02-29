/* eslint-disable import/no-unresolved */
import React from 'react'
import { Book } from 'react-feather'

import { StringEnum } from '@resources/StringEnum'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

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
      {StringEnum.ALL_NOTES}
    </div>
  )
}
