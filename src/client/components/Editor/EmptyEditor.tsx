import React from 'react'
import { isMacOs } from 'react-device-detect'

export const EmptyEditor: React.FC = () => {
  return (
    <div className="empty-editor v-center" data-testid="empty-editor">
      <div className="text-center">
        <p>
          <strong>Create a note</strong>
        </p>
        <p>
          <kbd>{isMacOs ? '⌃' : 'CTRL'}</kbd> + <kbd>{isMacOs ? '⌥' : 'ALT'}</kbd> + <kbd>N</kbd>
        </p>
      </div>
    </div>
  )
}
