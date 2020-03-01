/* eslint-disable import/no-unresolved */
import React from 'react'
import { Edit } from 'react-feather'

import { TestIDEnum } from '@resources/TestIDEnum'
import { StringEnum } from '@resources/StringEnum'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface ScratchpadOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const ScratchpadOption: React.FC<ScratchpadOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid={TestIDEnum.SCRATCHPAD}
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.SCRATCHPAD)
      }}
    >
      <Edit size={15} className="app-sidebar-icon" color={iconColor} />
      {StringEnum.SCRATCHPAD}
    </div>
  )
}
