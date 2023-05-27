import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { getSettings } from '@/selectors'

export const EmptyEditor: React.FC = () => {
  const { shortcuts } = useSelector(getSettings)

  return (
    <div className="empty-editor v-center" data-testid="empty-editor">
      <div className="text-center">
        <p>
          <strong>Create a note</strong>
        </p>
        <p>
          {shortcuts[0].key.split('+').map((key, index) => {
            return (
              <React.Fragment key={uuid()}>
                <kbd>{key.toUpperCase()}</kbd>
                {index !== shortcuts[0].key.split('+').length - 1 && <span> + </span>}
              </React.Fragment>
            )
          })}
        </p>
      </div>
    </div>
  )
}
