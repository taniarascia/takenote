import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { RefreshCw } from 'react-feather'

import { updateShortcut } from '@/slices/settings'
import { ShortcutItem } from '@/types'

export interface ShortcutProps {
  action: string
  shortcut: string
  id: number
  originalKey: string
  shortcuts: ShortcutItem[]
}

export const Shortcut: React.FC<ShortcutProps> = ({
  action,
  shortcut,
  id,
  originalKey,
  shortcuts,
}) => {
  const [newShortcut, setNewShortcut] = React.useState<string>('')
  const [currentShortcut, setCurrentShortcut] = React.useState<string>(shortcut)
  const [editShortcut, setEditShortcut] = React.useState<boolean>(false)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _updateShortcut = (newShortcut: string) =>
    dispatch(
      updateShortcut({
        action,
        key: shortcut,
        newShortcut: newShortcut,
        id: id,
        originalKey: originalKey,
      })
    )

  const _resetShortcut = () =>
    dispatch(
      updateShortcut({
        action,
        key: shortcut,
        newShortcut: originalKey,
        id: id,
        originalKey: originalKey,
      })
    )

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    if (newShortcut !== '') {
      _updateShortcut(newShortcut)
      setCurrentShortcut(newShortcut)
    }
    if (!editShortcut) {
      return document.removeEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [editShortcut])

  useEffect(() => {
    const shortcutItem = shortcuts.find((item) => item.id === id)
    if (shortcutItem) {
      setCurrentShortcut(shortcutItem.key)
    }
  }, [shortcuts])

  function handleKeyDown(e): void {
    e.preventDefault() // Prevent default browser behavior for the shortcut key

    const key = e.key.replace('Control', 'ctrl')
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
          <div>
            {currentShortcut.split('+').map((key, index) => {
              return (
                <React.Fragment key={uuid()}>
                  <kbd>{key.toUpperCase()}</kbd>
                  {index !== currentShortcut.split('+').length - 1 && <span> + </span>}
                </React.Fragment>
              )
            })}
          </div>
        ) : (
          <div>
            <kbd>
              <input
                onChange={() => {}}
                value={newShortcut.split('+').join(' + ')}
                className="shortcut-edit-input"
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

        <RefreshCw
          aria-hidden="true"
          size={12}
          onClick={() => {
            setCurrentShortcut(originalKey)
            _resetShortcut()
          }}
        />
      </div>
    </div>
  )
}
