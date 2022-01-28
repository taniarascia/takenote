import React from 'react'
import { Edit, Icon } from 'react-feather'

import { TestID } from '@resources/TestID'
import { LabelText } from '@resources/LabelText'
import { Folder } from '@/utils/enums'
import { iconColor2 } from '@/utils/constants'

export interface ScratchpadOptionProps {
  active: boolean
  swapFolder: (folder: Folder) => {}
  icon: Icon
  disabled?: boolean
}

export const ScratchpadOption: React.FC<ScratchpadOptionProps> = ({
  active,
  swapFolder,
  icon: IconCmp,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => {
        swapFolder(Folder.SCRATCHPAD)
      }}
      disabled={disabled}
      className="action-button2"
    >
      <Edit
        size={18}
        className="action-button-icon2"
        color={iconColor2}
        aria-hidden="true"
        focusable="false"
      />

      <span>{LabelText.SCRATCHPAD}</span>
    </button>
  )
}
