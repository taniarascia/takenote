import React from 'react'
import { Star, Trash2 } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'

import { Folder } from '@/utils/enums'
import { iconColor } from '@/utils/constants'

export interface FolderOptionProps {
  text: string
  active: boolean
  dataTestID: string
  folder: Folder
  swapFolder: (folder: Folder) => void
}

export const FolderOption: React.FC<FolderOptionProps> = ({
  text,
  active,
  dataTestID,
  folder,
  swapFolder,
}) => {
  const determineClass = (isDraggingOver: boolean) => {
    if (active) {
      return 'app-sidebar-link active'
    } else if (isDraggingOver) {
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
    <Droppable type="NOTES" droppableId={folder}>
      {(droppableProvided, snapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          data-testid={dataTestID}
          className={determineClass(snapshot.isDraggingOver)}
          onClick={() => {
            swapFolder(folder)
          }}
        >
          {renderIcon()}
          {text}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
