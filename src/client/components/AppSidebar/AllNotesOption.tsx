import React, { useState } from 'react'
import { Book } from 'react-feather'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'
import { ReactDragEvent } from '@/types'

export interface AllNotesOptionProps {
  active: boolean
  folder: Folder
  swapFolder: (folder: Folder) => {}
  addNoteType: (noteId: string) => void
}

export const AllNotesOption: React.FC<AllNotesOptionProps> = ({
  active,
  folder,
  swapFolder,
  addNoteType,
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const dragEnterHandler = () => {
    if (folder === Folder.ALL) {
      setIsDraggedOver(true)
    }
  }
  const dragLeaveHandler = () => {
    setIsDraggedOver(false)
  }
  const noteHandler = (event: ReactDragEvent) => {
    event.preventDefault()
    addNoteType(event.dataTransfer.getData('text'))
  }
  const determineClass = () => {
    if (active) {
      return 'app-sidebar-link active'
    } else if (isDraggedOver) {
      return 'app-sidebar-link dragged-over'
    } else {
      return 'app-sidebar-link'
    }
  }

  return (
    <div
      data-testid={TestID.FOLDER_NOTES}
      className={determineClass()}
      onClick={() => {
        swapFolder(Folder.ALL)
      }}
      onDragOver={(event: ReactDragEvent) => {
        event.preventDefault()
      }}
      onDrop={noteHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      <Book size={15} className="app-sidebar-icon" color={iconColor} />
      {LabelText.NOTES}
    </div>
  )
}
