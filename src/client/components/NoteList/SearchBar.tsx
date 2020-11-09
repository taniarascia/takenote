import React from 'react'

import { TestID } from '@resources/TestID'

export interface SearchBarProps {
  searchRef: React.MutableRefObject<HTMLInputElement>
  searchNotes: (searchValue: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchRef, searchNotes }) => {
  return (
    <input
      ref={searchRef}
      data-testid={TestID.NOTE_SEARCH}
      type="search"
      onChange={(event) => {
        event.preventDefault()
        searchNotes(event.target.value)
      }}
      placeholder="Search for notes"
      onDragOver={(e) => {
        e.preventDefault()
      }}
    />
  )
}
