import React, { ChangeEvent, useRef } from 'react'
import { Icon } from 'react-feather'

import { iconColor } from '@/utils/constants'

export interface IconButtonUploaderProps {
  dataTestID?: string
  disabled?: boolean
  handler: (file: File) => void
  icon: Icon
  text: string
  accept: string
}

export const IconButtonUploader: React.FC<IconButtonUploaderProps> = ({
  dataTestID,
  disabled = false,
  handler,
  icon: IconCmp,
  text,
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handler(e.target.files[0])
    }
  }

  return (
    <div>
      <input
        data-testid={dataTestID}
        accept={accept}
        tabIndex={-1}
        autoComplete="off"
        ref={inputRef}
        type="file"
        onChange={handleFileInput}
        className="hidden"
      />
      <button
        onClick={handleClick}
        aria-label={text}
        disabled={disabled}
        title={text}
        className="icon-button"
      >
        <IconCmp
          size={18}
          className="button-icon"
          color={iconColor}
          aria-hidden="true"
          focusable="false"
        />
        {text}
      </button>
    </div>
  )
}
