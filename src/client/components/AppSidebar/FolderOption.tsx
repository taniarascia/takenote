import React, { useState } from 'react'
import { Star, Trash2 } from 'react-feather'

import { Folder } from '@/constants/enums'
import { iconColor } from '@/constants/index'
import { ReactDragEvent } from '@/types'

export interface FolderOptionProps {
  text: string
  active: boolean
  dataTestID: string
  folder: Folder
  swapFolder: (folder: Folder) => void
  addNoteType: (noteId: string) => void
}

export const FolderOption: React.FC<FolderOptionProps> = ({
  text,
  active,
  dataTestID,
  folder,
  swapFolder,
  addNoteType,
}) => {
  const [mainSectionDragState, setMainSectionDragState] = useState({
    [Folder.ALL]: false,
    [Folder.FAVORITES]: false,
    [Folder.TRASH]: false,
    [Folder.CATEGORY]: false,
  })
  const dragEnterHandler = () => {
    setMainSectionDragState({ ...mainSectionDragState, [folder]: true })
  }
  const dragLeaveHandler = () => {
    setMainSectionDragState({ ...mainSectionDragState, [folder]: false })
  }
  const noteHandler = (event: ReactDragEvent) => {
    event.preventDefault()

    addNoteType(event.dataTransfer.getData('text'))
    dragLeaveHandler()
  }

  const determineClass = () => {
    if (active) {
      return 'app-sidebar-link active'
    } else if (mainSectionDragState[folder]) {
      return 'app-sidebar-link dragged-over'
    } else {
      return 'app-sidebar-link'
    }
  }

  const renderIcon = () => {
    if (folder === 'FAVORITES') {
      return <Star size={15} className="app-sidebar-icon" color={iconColor} />
    } else {
      return <Trash2 size={15} className="app-sidebar-icon" color={iconColor} />
    }
  }

  return (
    <div
      data-testid={dataTestID}
      className={determineClass()}
      onClick={() => {
        swapFolder(folder)
      }}
      onDrop={noteHandler}
      onDragOver={(event: ReactDragEvent) => {
        event.preventDefault()
      }}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      {renderIcon()}
      {text}
    </div>
  )
}
