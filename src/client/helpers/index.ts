import moment from 'moment'
import uuid from 'uuid/v4'
import { Action } from 'redux'

import { Folder } from '@/constants/enums'
import { folderMap } from '@/constants/index'
import { NoteItem, CategoryItem, WithPayload } from '@/types'

export const getNoteTitle = (text: string): string => {
  // Remove whitespace from both ends
  // Get the first n characters
  // Remove # from the title in the case of using markdown headers in your title
  const noteText = text.trim().match(/[^#]{1,40}/)

  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].split(/\r?\n/)[0] : 'New note'
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
  if (activeFolder === Folder.TRASH) {
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
  return (
    (clicked instanceof Element &&
      // If the element is explicitly a context menu action
      clicked.classList.contains('context-menu-action')) ||
    // Or if it's a sub-element of the context menu
    (clicked.tagName === 'circle' &&
      clicked.parentElement!.classList.contains('context-menu-action'))
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

export const determineTheme = (darkTheme?: boolean) => {
  if (darkTheme) {
    return 'app dark'
  } else {
    return 'app'
  }
}
