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
    <button
      onClick={() => {
        swapFolder(Folder.SCRATCHPAD)
      }}
      className="app-sidebar-wrapper"
    >
      <div data-testid={TestID.SCRATCHPAD} className={`app-sidebar-link ${active ? 'active' : ''}`}>
        <Edit size={15} className="app-sidebar-icon" color={iconColor} />
        {LabelText.SCRATCHPAD}
      </div>
    </button>
  )
}
