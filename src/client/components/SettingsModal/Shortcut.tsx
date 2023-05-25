import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as uuid from 'uuid'

import { updateShortcut } from '@/slices/settings'

export interface ShortcutProps {
  action: string
  shortcut: string
  id: number
}

export const Shortcut: React.FC<ShortcutProps> = ({ action, shortcut, id }) => {
  const [newShortcut, setNewShortcut] = React.useState<string>('')
  const [currentShortcut, setCurrentShortcut] = React.useState<string>(shortcut)
  const [editShortcut, setEditShortcut] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  const _updateShortcut = (newShortcut: string) =>
    dispatch(
      updateShortcut({
        action,
        key: shortcut,
        newShortcut: newShortcut,
        id: id,
      })
    )

  useEffect(() => {
    if (newShortcut !== '') {
      _updateShortcut(newShortcut)
      setCurrentShortcut(newShortcut)
    }
    if (!editShortcut) {
      return document.removeEventListener('keydown', handleKeyDown)
    }
  }, [editShortcut])

  function handleKeyDown(e: any): void {
    e.preventDefault() // Prevent default browser behavior for the shortcut key

    const key = e.key.replace('Control', 'ctrl').replace('ALTGRAPH', 'alt')
    if (key === 'Backspace') {
      return setNewShortcut((prevShortcut) => prevShortcut.split('+').slice(0, -1).join('+'))
    }

    if (key === 'Enter') {
      if (newShortcut === '') {
        setEditShortcut(false)

        return setNewShortcut(shortcut)
      }
      setCurrentShortcut(newShortcut)
      setEditShortcut(false)

      return document.removeEventListener('keydown', handleKeyDown)
    }
    setNewShortcut((prevShortcut) => {
      if (prevShortcut.split('+').length < 3) {
        return prevShortcut === '' ? key : `${prevShortcut}+${key}`
      }

      return prevShortcut
    })
  }

  return (
    <div className="settings-shortcut">
      <div>{action}</div>
      <div className="keys" onDoubleClick={() => setEditShortcut(!editShortcut)}>
        {!editShortcut ? (
          currentShortcut.split('+').map((key, index) => {
            return (
              <React.Fragment key={uuid.v4()}>
                <kbd>{key.toUpperCase()}</kbd>
                {index !== currentShortcut.split('+').length - 1 && <span> + </span>}
              </React.Fragment>
            )
          })
        ) : (
          <div>
            <kbd>
              <input
                value={newShortcut.split('+').join(' + ')}
                className="settings-shortcut-input"
                onBlur={() => {
                  if (editShortcut) {
                    setNewShortcut('')
                    setCurrentShortcut(shortcut)
                    setEditShortcut(false)

                    return document.removeEventListener('keydown', handleKeyDown)
                  }
                }}
                onFocus={() => {
                  setNewShortcut('')
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
