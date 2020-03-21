import { getNoteTitle } from './helpers'
import { NotesSortKey } from './enums'

import { NoteItem } from '@/types'

export interface NotesSortStrategy {
  sort: (a: NoteItem, b: NoteItem) => number
}

const _favorites: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    if (a.favorite && !b.favorite) return -1
    if (!a.favorite && b.favorite) return 1
    return 0
  },
}

const _createdDate: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    let dateA = new Date(a.created)
    let dateB = new Date(b.created)

    return dateA < dateB ? 1 : -1
  },
}

const _lastUpdated: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    let dateA = new Date(a.lastUpdated)
    let dateB = new Date(b.lastUpdated)

    // the first note in the list should consistently sort after if it is created at the same time
    return dateA < dateB ? 1 : -1
  },
}

const _title: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    let titleA = getNoteTitle(a.text)
    let titleB = getNoteTitle(b.text)

    if (titleA === titleB) return 0
    return titleA > titleB ? 1 : -1
  },
}

export const _sortStrategyMap: { [key in NotesSortKey]: NotesSortStrategy } = {
  [NotesSortKey.LAST_UPDATED]: _lastUpdated,
  [NotesSortKey.FAVORITES]: _favorites,
  [NotesSortKey.TITLE]: _title,
  [NotesSortKey.CREATED_DATE]: _createdDate,
}

export const getNotesSorter = (notesSortKey: NotesSortKey) => _sortStrategyMap[notesSortKey].sort
