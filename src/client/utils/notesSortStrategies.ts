import { NoteItem } from '@/types'

import { getNoteTitle } from './helpers'
import { NotesSortKey } from './enums'

export interface NotesSortStrategy {
  sort: (a: NoteItem, b: NoteItem) => number
}

const withFavorites = (sortFunction: NotesSortStrategy['sort']) => (a: NoteItem, b: NoteItem) => {
  if (a.favorite && !b.favorite) return -1
  if (!a.favorite && b.favorite) return 1

  return sortFunction(a, b)
}

const createdDate: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(a.created)
    const dateB = new Date(b.created)

    return dateA < dateB ? 1 : -1
  },
}

const lastUpdated: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(a.lastUpdated)
    const dateB = new Date(b.lastUpdated)

    // the first note in the list should consistently sort after if it is created at the same time
    return dateA < dateB ? 1 : -1
  },
}

const title: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const titleA = getNoteTitle(a.text)
    const titleB = getNoteTitle(b.text)

    if (titleA === titleB) return 0

    return titleA > titleB ? 1 : -1
  },
}

export const sortStrategyMap: { [key in NotesSortKey]: NotesSortStrategy } = {
  [NotesSortKey.LAST_UPDATED]: lastUpdated,
  [NotesSortKey.TITLE]: title,
  [NotesSortKey.CREATED_DATE]: createdDate,
}

export const getNotesSorter = (notesSortKey: NotesSortKey) =>
  withFavorites(sortStrategyMap[notesSortKey].sort)
