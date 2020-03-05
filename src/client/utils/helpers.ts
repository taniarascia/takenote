import moment from 'moment'
import uuid from 'uuid/v4'
import { Action } from 'redux'

import { LabelText } from '@resources/LabelText'

import { Folder } from '@/utils/enums'
import { folderMap } from '@/utils/constants'
import { NoteItem, CategoryItem, WithPayload } from '@/types'

export const getActiveNote = (notes: NoteItem[], activeNoteId: string) =>
  notes.find(note => note.id === activeNoteId)

export const getActiveCategory = (categories: CategoryItem[], activeCategoryId: string) =>
  categories.find(({ id }) => id === activeCategoryId)

export const getNoteTitle = (text: string): string => {
  // Remove whitespace from both ends
  // Get the first n characters
  // Remove # from the title in the case of using markdown headers in your title
  const noteText = text.trim().match(/[^#]{1,40}/)

  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].split(/\r?\n/)[0] : LabelText.NEW_NOTE
}

export const noteWithFrontmatter = (note: NoteItem, category?: CategoryItem): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${category?.name ?? ''}
---

${note.text}`

export const downloadNote = (filename: string, note: NoteItem, category?: CategoryItem): void => {
  const pom = document.createElement('a')

  pom.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(noteWithFrontmatter(note, category))}`
  )
  pom.setAttribute('download', `${filename}.md`)

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
}

const newNote = (categoryId?: string, folder?: Folder): NoteItem => ({
  id: uuid(),
  text: '',
  created: moment().format(),
  lastUpdated: moment().format(),
  category: categoryId,
  favorite: folder === Folder.FAVORITES,
})

export const newNoteHandlerHelper = (
  activeFolder: Folder,
  previewMarkdown: boolean,
  activeNote: NoteItem | undefined,
  activeCategoryId: string,
  swapFolder: (folder: Folder) => WithPayload<string, Action<string>>,
  togglePreviewMarkdown: () => WithPayload<undefined, Action<string>>,
  addNote: (note: NoteItem) => WithPayload<NoteItem, Action<string>>,
  swapNote: (noteId: string) => WithPayload<string, Action<string>>
) => {
  if ([Folder.TRASH, Folder.SCRATCHPAD].indexOf(activeFolder) !== -1) {
    swapFolder(Folder.ALL)
  }

  if (previewMarkdown) {
    togglePreviewMarkdown()
  }

  if ((activeNote && activeNote.text !== '') || !activeNote) {
    const note = newNote(
      activeCategoryId,
      activeFolder === Folder.TRASH ? Folder.ALL : activeFolder
    )
    addNote(note)
    swapNote(note.id)
  }
}

export const sortByFavorites = (a: NoteItem, b: NoteItem) => {
  if (a.favorite && !b.favorite) return -1
  if (!a.favorite && b.favorite) return 1
  return 0
}

export const sortByLastUpdated = (a: NoteItem, b: NoteItem) => {
  let dateA = new Date(a.lastUpdated)
  let dateB = new Date(b.lastUpdated)

  // the first note in the list should consistently sort after if it is created at the same time
  return dateA < dateB ? 1 : -1
}

export const shouldOpenContextMenu = (clicked: Element) => {
  const elementContainsClass = (className: string) => clicked.classList.contains(className)

  const parentContainsClass = (className: string) =>
    clicked.parentElement!.classList.contains(className)

  return (
    (clicked instanceof Element &&
      // If the element is explicitly a context menu action
      elementContainsClass('context-menu-action')) ||
    // If the element is an item of the context menu
    (!elementContainsClass('nav-item') &&
      !elementContainsClass('options-context-menu') &&
      !elementContainsClass('nav-item-icon') &&
      !parentContainsClass('nav-item-icon')) ||
    // Or if it's a sub-element of the context menu
    (clicked.tagName === 'circle' && parentContainsClass('context-menu-action'))
  )
}

export const getWebsiteTitle = (activeFolder: Folder, activeCategory?: CategoryItem) => {
  // Show category name if category is active
  if (activeFolder === Folder.CATEGORY && activeCategory) {
    return `${activeCategory.name} | TakeNote`
  } else {
    // Show main folder name otherwise
    return `${folderMap[activeFolder]} | TakeNote`
  }
}

export const determineAppClass = (
  darkTheme: boolean,
  sidebarVisible: boolean,
  activeFolder: Folder
) => {
  let className = 'app'

  if (darkTheme) className += ' dark'

  if (activeFolder === Folder.SCRATCHPAD) {
    className += ' scratchpad'
  } else if (!sidebarVisible) {
    className += ' sidebar-hidden'
  }

  return className
}

export const determineCategoryClass = (
  category: CategoryItem,
  isDragging: boolean,
  activeCategoryId: string
) => {
  if (category.draggedOver) {
    return 'category-list-each dragged-over'
  } else if (category.id === activeCategoryId) {
    return 'category-list-each active'
  } else if (isDragging) {
    return 'category-list-each dragging'
  } else {
    return 'category-list-each'
  }
}
