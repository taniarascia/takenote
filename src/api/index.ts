import { SyncStatePayload, SyncSettingPayload } from 'types'

export const requestCategories = () =>
  new Promise((resolve, reject) => {
    const data = localStorage.getItem('categories') || '[]'

    if (data) {
      resolve(JSON.parse(data))
    } else {
      reject({ message: 'Something went wrong' })
    }
  })

export const requestNotes = () =>
  new Promise((resolve, reject) => {
    const data = localStorage.getItem('notes') || '[]'

    if (data) {
      resolve(JSON.parse(data))
    } else {
      reject({ message: 'Something went wrong' })
    }
  })

export const saveState = ({ categories, notes }: SyncStatePayload) =>
  new Promise(resolve => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('notes', JSON.stringify(notes))

    resolve({
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    })
  })

export const saveSettings = ({ previewMarkdown, codeMirrorOption, theme }: SyncSettingPayload) =>
  new Promise(resolve => {
    localStorage.setItem('previewMarkdown', JSON.stringify(previewMarkdown))
    localStorage.setItem('codeMirrorOption', JSON.stringify(codeMirrorOption))
    localStorage.setItem('theme', JSON.stringify(theme))

    resolve({
      previewMarkdown: localStorage.getItem('previewMarkdown'),
      codeMirrorOption: localStorage.getItem('codeMirrorOption'),
      theme: localStorage.getItem('theme'),
    })
  })

export const requestPreviewMarkdown = () =>
  new Promise((resolve, reject) => {
    const previewMarkdown = localStorage.getItem('previewMarkdown')
    if (previewMarkdown) {
      resolve(JSON.parse(previewMarkdown))
    } else {
      reject({ message: `Could not load previewMarkdown. An error occurred` })
    }
  })

export const requestCodeMirrorOption = () =>
  new Promise((resolve, reject) => {
    const codeMirrorOption = localStorage.getItem('codeMirrorOption')
    if (codeMirrorOption) {
      resolve(JSON.parse(codeMirrorOption))
    } else {
      reject({ message: `Could not load code mirror options. An error occurred` })
    }
  })

export const requestTheme = () =>
  new Promise((resolve, reject) => {
    const theme = localStorage.getItem('theme')
    if (theme) {
      resolve(JSON.parse(theme))
    } else {
      reject({ message: `Could not load theme. An error occurred` })
    }
  })
