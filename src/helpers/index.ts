import { NoteItem } from 'types'

export function getNoteTitle(text: string): string {
  const noteTitleRegEx = /[\w ]{1,50}/

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
