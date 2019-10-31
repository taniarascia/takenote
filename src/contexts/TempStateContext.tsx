import React, { createContext, FunctionComponent, useContext, useState } from 'react'

interface TempStateContextInterface {
  addingTempCategory: boolean
  setAddingTempCategory(adding: boolean): void
  errorCategoryMessage: string
  setErrorCategoryMessage(message: string): void
  navOpen: boolean
  setNavOpen(open: boolean): void
  noteOpen: boolean
  setNoteOpen(open: boolean): void
}

const initialContextValue = {
  addingTempCategory: false,
  setAddingTempCategory: (adding: boolean) => undefined,
  errorCategoryMessage: '',
  setErrorCategoryMessage: (message: string) => undefined,
  navOpen: false,
  setNavOpen: (adding: boolean) => undefined,
  noteOpen: false,
  setNoteOpen: (adding: boolean) => undefined,
}

const TempStateContext = createContext<TempStateContextInterface>(initialContextValue)
const useTempState = () => {
  const context = useContext(TempStateContext)

  if (!context) {
    throw new Error('useTempState must be used within a TempStateContext')
  }
  return context
}
const TempStateProvider: FunctionComponent = ({ children }) => {
  const [noteOpen, setNoteOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [errorCategoryMessage, setErrorCategoryMessage] = useState('')

  const value: TempStateContextInterface = {
    noteOpen,
    setNoteOpen,
    navOpen,
    setNavOpen,
    addingTempCategory,
    setAddingTempCategory,
    errorCategoryMessage,
    setErrorCategoryMessage,
  }
  return <TempStateContext.Provider value={value}>{children}</TempStateContext.Provider>
}

export { TempStateProvider, useTempState }
