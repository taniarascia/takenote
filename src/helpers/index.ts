import { NoteItem } from 'types'

export function getNoteTitle(text: string): string {
  let noteTitle: string

  if (!text) {
    noteTitle = 'New Note'
  } else if (text.indexOf('\n') !== -1) {
    noteTitle = text.slice(0, text.indexOf('\n'))
  } else {
    noteTitle = text.slice(0, 50)
  }

  return noteTitle
}

export function noteWithFrontmatter(note: NoteItem): string {
  return `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
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
