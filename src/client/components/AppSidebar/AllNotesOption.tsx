import React from 'react'
import { Book } from 'react-feather'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface AllNotesOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const AllNotesOption: React.FC<AllNotesOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid={TestID.FOLDER_ALL_NOTES}
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.ALL)
      }}
    >
      <Book size={15} className="app-sidebar-icon" color={iconColor} />
      {LabelText.ALL_NOTES}
    </div>
  )
}
