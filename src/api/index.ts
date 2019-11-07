import { SyncStatePayload, SettingsState } from 'types'

type PromiseCallbackFun = (value?: any) => void
type GetLocalStorage = (
  key: string,
  errorMsg?: string
) => (resolve: PromiseCallbackFun, reject: PromiseCallbackFun) => void
const getLocalStorage: GetLocalStorage = (key, errorMsg = 'Something went wrong') => (
  resolve,
  reject
) => {
  const data = localStorage.getItem(key)

  if (data) {
    resolve(JSON.parse(data))
  } else {
    reject({
      message: errorMsg,
    })
  }
}

export const requestNotes = () => new Promise(getLocalStorage('notes'))

export const requestCategories = () => new Promise(getLocalStorage('categories'))

export const requestSettings = () =>
  new Promise(getLocalStorage('settings', 'Could not load code mirror options. An error occurred'))

export const saveState = ({ categories, notes }: SyncStatePayload) =>
  new Promise(resolve => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('notes', JSON.stringify(notes))

    resolve({
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    })
  })

export const saveSettings = (settings: SettingsState) =>
  Promise.resolve(localStorage.setItem('settings', JSON.stringify(settings)))
