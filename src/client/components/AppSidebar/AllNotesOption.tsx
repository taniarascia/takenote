import React from 'react'
import { Book } from 'react-feather'

import { StringEnum } from '@resources/StringEnum'
import { TestIDEnum } from '@resources/TestIDEnum'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface AllNotesOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const AllNotesOption: React.FC<AllNotesOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid={TestIDEnum.FOLDER_ALL_NOTES}
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
