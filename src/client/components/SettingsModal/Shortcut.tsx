import React from 'react'

export interface ShortcutProps {
  action: string
  letter: string
}

export const Shortcut: React.FC<ShortcutProps> = ({ action, letter }) => {
  return (
    <div className="settings-shortcut">
      <div>{action}</div>
      <div>
        <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>{letter}</kbd>
      </div>
    </div>
  )
}
