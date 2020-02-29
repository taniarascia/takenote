import React from 'react'

export const EmptyEditor: React.FC = () => {
  return (
    <div className="empty-editor v-center">
      <div className="text-center">
        <p>
          <strong>Create a note</strong>
        </p>
        <p>
          <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
        </p>
      </div>
    </div>
  )
}
