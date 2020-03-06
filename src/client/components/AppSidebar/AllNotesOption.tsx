import React from 'react'
import { Book } from 'react-feather'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'
import { ReactDragEvent } from '@/types'

export interface AllNotesOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
  noteHandler: (event: ReactDragEvent) => void
}

export const AllNotesOption: React.FC<AllNotesOptionProps> = ({
  active,
  swapFolder,
  noteHandler,
}) => {
  return (
    <div
      data-testid={TestID.FOLDER_ALL_NOTES}
      className={`app-sidebar-link ${active ? 'active' : ''}`}
      onClick={() => {
        swapFolder(Folder.ALL)
      }}
      onDragOver={(event: ReactDragEvent) => {
        event.preventDefault()
      }}
      onDrop={noteHandler}
    >
      <Book size={15} className="app-sidebar-icon" color={iconColor} />
      {LabelText.ALL_NOTES}
    </div>
  )
}
