import React, { useEffect } from 'react'

export interface ShortcutProps {
  action: string
  shortcut: string
}

export const Shortcut: React.FC<ShortcutProps> = ({ action, shortcut }) => {
  const [newShortcut, setNewShortcut] = React.useState<string>('')
  const [currentShortcut, setCurrentShortcut] = React.useState<string>(shortcut)
  const [editShortcut, setEditShortcut] = React.useState<boolean>(false)

  useEffect(() => {
    if (newShortcut !== '') {
      setCurrentShortcut(newShortcut)
    }
  }, [editShortcut])

  return (
    <div className="settings-shortcut">
      <div>{action}</div>
      <div className="keys" onDoubleClick={() => setEditShortcut(!editShortcut)}>
        {!editShortcut ? (
          currentShortcut.split('+').map((key, index) => {
            return (
              <React.Fragment key={key}>
                <kbd>{key.toUpperCase()}</kbd>
                {index !== currentShortcut.split('+').length - 1 && <span> + </span>}
              </React.Fragment>
            )
          })
        ) : (
          <div>
            <kbd>
              <input
                value={newShortcut}
                className="settings-shortcut-input"
                onFocus={() => {
                  setNewShortcut('')
                  const handleKeyDown = (e) => {
                    e.preventDefault() // Prevent default browser behavior for the shortcut key
                    const key = e.key.replace('Control', 'ctrl')
                    if (key === 'Backspace') {
                      setNewShortcut((prevShortcut) =>
                        prevShortcut.split('+').slice(0, -1).join('+')
                      )
                    }
                    if (key === 'Enter') {
                      setCurrentShortcut(newShortcut)
                      setEditShortcut(false)

                      return document.removeEventListener('keydown', handleKeyDown)
                    }
                    setNewShortcut((prevShortcut) =>
                      prevShortcut === '' ? key : `${prevShortcut} + ${key}`
                    )
                  }
                  document.addEventListener('keydown', handleKeyDown)
                }}
              />
            </kbd>
          </div>
        )}
      </div>
    </div>
  )
}
