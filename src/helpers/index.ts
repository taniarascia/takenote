import { NoteItem } from 'types'

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
