import uuid from 'uuid/v4'
import moment from 'moment'
import { NoteItem } from 'types'
import { Folders } from 'constants/enums'

export function getNoteTitle(text: string): string {
  let noteTitle: string
  let noteText = text[0] === '#' && text[1] === ' ' ? text.slice(2, 52) : text.slice(0, 50)

  if (!noteText) {
    noteTitle = 'New Note'
  } else if (noteText.indexOf('\n') !== -1) {
    noteTitle = noteText.slice(0, noteText.indexOf('\n'))
  } else {
    noteTitle = noteText.slice(0, 50)
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
  favorite: folder === Folders.FAVORITES,
})
