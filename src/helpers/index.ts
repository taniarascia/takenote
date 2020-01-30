import moment from 'moment'
import uuid from 'uuid/v4'
import { Action } from 'redux'

import { NoteItem, WithPayload } from 'types'
import { Folder } from 'constants/enums'

export const getNoteTitle = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,50}/)
  const noteTextFirstLine = noteText ? noteText[0].split(/\r?\n/)[0] : 'New Note'

  return noteTextFirstLine
}

export const noteWithFrontmatter = (note: NoteItem): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${note.category ? note.category : ''}
---

${note.text}`

export const downloadNote = (filename: string, note: NoteItem): void => {
  const pom = document.createElement('a')

  pom.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(noteWithFrontmatter(note))}`
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

export const sortByFavourites = (a: NoteItem, b: NoteItem) => {
  if (a.favorite && !b.favorite) return -1
  if (!a.favorite && b.favorite) return 1
  return 0
}

export const sortByLastUpdated = (a: NoteItem, b: NoteItem) => {
  let dateA = new Date(a.lastUpdated)
  let dateB = new Date(b.lastUpdated)

  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
}
