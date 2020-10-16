/* eslint-disable import/no-unresolved */
import React from 'react'
import { Edit } from 'react-feather'

import { TestID } from '@resources/TestID'
import { LabelText } from '@resources/LabelText'
import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface ScratchpadOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const ScratchpadOption: React.FC<ScratchpadOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid={TestID.SCRATCHPAD}
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.SCRATCHPAD)
      }}
    >
      <Edit size={15} className="app-sidebar-icon" color={iconColor} />
      {LabelText.SCRATCHPAD}
    </div>
  )
}
