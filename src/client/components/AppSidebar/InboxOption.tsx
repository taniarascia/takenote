/* eslint-disable import/no-unresolved */
import React from 'react'
import { Book } from 'react-feather'

import { StringEnum } from '@resources/StringEnum'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface InboxOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
}

export const InboxOption: React.FC<InboxOptionProps> = ({ active, swapFolder }) => {
  return (
    <div
      data-testid="inbox"
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.INBOX)
      }}
    >
      <Book size={15} className="app-sidebar-icon" color={iconColor} />
      {StringEnum.INBOX}
    </div>
  )
}
