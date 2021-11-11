import React from 'react'
import { isMacOs } from 'react-device-detect'

export interface ShortcutProps {
  action: string
  letter: string
}

export const Shortcut: React.FC<ShortcutProps> = ({ action, letter }) => {
  return (
    <div className="settings-shortcut">
      <div>{action}</div>
      <div className="keys">
        <kbd>{isMacOs ? '⌃' : 'CTRL'}</kbd> + <kbd>{isMacOs ? '⌥' : 'ALT'}</kbd> +{' '}
        <kbd>{letter}</kbd>
      </div>
    </div>
  )
}
