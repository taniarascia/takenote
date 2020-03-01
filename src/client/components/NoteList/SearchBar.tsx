import React from 'react'

import { TestIDEnum } from '@resources/TestIDEnum'

export interface SearchBarProps {
  searchRef: React.MutableRefObject<HTMLInputElement>
  searchNotes: (searchValue: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchRef, searchNotes }) => {
  return (
    <input
      ref={searchRef}
      data-testid={TestIDEnum.NOTE_SEARCH}
      className="note-search"
      type="search"
      onChange={event => {
        event.preventDefault()
        searchNotes(event.target.value)
      }}
      placeholder="Search for notes"
    />
  )
}
