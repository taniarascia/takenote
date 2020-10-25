import { SyncPayload, SettingsState } from '@/types'

type PromiseCallback = (value?: any) => void
type GetLocalStorage = (
  key: string,
  errorMessage?: string
) => (resolve: PromiseCallback, reject: PromiseCallback) => void

const getLocalStorage: GetLocalStorage = (key, errorMessage = 'Something went wrong') => (
  resolve,
  reject
) => {
  const data = localStorage.getItem(key)

  if (data) {
    resolve(JSON.parse(data))
  } else {
    reject({
      message: errorMessage,
    })
  }
}

export const requestNotesMock = () => new Promise(getLocalStorage('notes'))
export const requestCategoriesMock = () => new Promise(getLocalStorage('categories'))
export const requestSettingsMock = () =>
  new Promise(getLocalStorage('settings', 'Could not load settings'))
export const saveStateMock = ({ categories, notes }: SyncPayload) =>
  new Promise((resolve) => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('notes', JSON.stringify(notes))

    resolve({
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    })
  })

export const saveSettings = ({ isOpen, ...settings }: SettingsState) =>
  Promise.resolve(localStorage.setItem('settings', JSON.stringify(settings)))
