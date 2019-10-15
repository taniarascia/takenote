import moment from 'moment'
import uuid from 'uuid/v4'

import { Folder } from 'constants/enums'
import { NoteItem } from 'types'

export function getNoteTitle(text: string): string {
  const noteTitleRegEx = /[\w'?!., ]{1,50}/

  let noteTitle: string
  let noteText = text.match(noteTitleRegEx)

  if (!noteText) {
    noteTitle = 'New Note'
  } else {
    noteTitle = noteText[0]
  }

  return noteTitle
}

export function noteWithFrontmatter(note: NoteItem): string {
  return `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${note.category ? note.category : ''}
---

${note.text}`
}

export function downloadNote(filename: string, note: NoteItem): void {
  const pom = document.createElement('a')

  pom.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(noteWithFrontmatter(note))
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

export function sortByLastUpdated(a: NoteItem, b: NoteItem) {
  let dateA = new Date(a.lastUpdated)
  let dateB = new Date(b.lastUpdated)

  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
}

export const newNote = (categoryId?: string, folder?: string): NoteItem => ({
  id: uuid(),
  text: '',
  created: moment().format(),
  lastUpdated: moment().format(),
  category: categoryId,
  favorite: folder === Folder.FAVORITES,
})
