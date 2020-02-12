import React from 'react'

export interface SearchBarProps {
  searchRef: React.MutableRefObject<HTMLInputElement>
  searchNotes: (searchValue: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchRef, searchNotes }) => {
  return (
    <input
      data-testid="note-search"
      className="note-search"
      ref={searchRef}
      type="search"
      onChange={event => {
        event.preventDefault()
        searchNotes(event.target.value)
      }}
      placeholder="Search for notes"
    />
  )
}
