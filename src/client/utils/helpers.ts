import dayjs from 'dayjs'
import uuid from 'uuid/v4'
import JSZip from 'jszip'
import { Action } from 'redux'

import { LabelText } from '@resources/LabelText'

import { Folder } from '@/utils/enums'
import { folderMap } from '@/utils/constants'
import { NoteItem, CategoryItem, WithPayload } from '@/types'

export const getActiveNote = (notes: NoteItem[], activeNoteId: string) =>
  notes.find((note) => note.id === activeNoteId)

export const getActiveCategory = (categories: CategoryItem[], activeCategoryId: string) =>
  categories.find(({ id }) => id === activeCategoryId)

export const getNoteTitle = (text: string): string => {
  // Remove whitespace from both ends
  // Get the first n characters
  // Remove # from the title in the case of using markdown headers in your title
  const noteText = text.trim().match(/[^#]{1,38}/)

  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE
}

export const noteWithFrontmatter = (note: NoteItem, category?: CategoryItem): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${category?.name ?? ''}
---

${note.text}`

// Downloads a single note as a markdown file or a group of notes as a zip file.
export const downloadNotes = (notes: NoteItem[], categories: CategoryItem[]): void => {
  if (notes.length === 1) {
    const pom = document.createElement('a')

    pom.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(
        noteWithFrontmatter(
          notes[0],
          categories.find((category: CategoryItem) => category.id === notes[0].category)
        )
      )}`
    )
    pom.setAttribute('download', `${getNoteTitle(notes[0].text)}.md`)

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    } else {
      pom.click()
    }
  } else {
    const zip = new JSZip()
    notes.forEach((note) =>
      zip.file(
        `${getNoteTitle(note.text)}.md`,
        noteWithFrontmatter(
          note,
          categories.find((category: CategoryItem) => category.id === note.category)
        )
      )
    )

    zip.generateAsync({ type: 'blob' }).then(
      (content) => {
        var downloadUrl = window.URL.createObjectURL(content)
        var a = document.createElement('a')
        a.href = downloadUrl
        a.download = 'notes.zip'
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(downloadUrl)
      },
      (err) => {
        // TODO: error generating zip file.
        // Generate a popup?
      }
    )
  }
}

const newNote = (categoryId?: string, folder?: Folder): NoteItem => ({
  id: uuid(),
  text: '',
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
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
  updateActiveNote: (
    noteId: string,
    multiSelect: boolean
  ) => WithPayload<
    {
      noteId: string
      multiSelect: boolean
    },
    Action<string>
  >,
  updateSelectedNotes: (
    noteId: string,
    multiSelect: boolean
  ) => WithPayload<
    {
      noteId: string
      multiSelect: boolean
    },
    Action<string>
  >
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
    updateSelectedNotes(note.id, false)
    updateActiveNote(note.id, false)
  }
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

export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
  let h = 0
  let callable = (...args: any) => {
    clearTimeout(h)
    h = window.setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}
