import React, { createContext, FunctionComponent, useContext, useState } from 'react'

interface KeyboardContextInterface {
  addingTempCategory: boolean
  setAddingTempCategory(adding: boolean): void
  errorCategoryMessage: string
  setErrorCategoryMessage(message: string): void
}

const initialContextValue = {
  errorCategoryMessage: '',
  addingTempCategory: false,
  setAddingTempCategory: (adding: boolean) => undefined,
  setErrorCategoryMessage: (message: string) => undefined,
}

const KeyboardContext = createContext<KeyboardContextInterface>(initialContextValue)
const useKeyboard = () => {
  const context = useContext(KeyboardContext)
  if (!context) {
    throw new Error('useKeyboard must be used within a KeyboardContext')
  }
  return context
}
const KeyboardProvider: FunctionComponent = ({ children }) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [errorCategoryMessage, setErrorCategoryMessage] = useState('')
  const value: KeyboardContextInterface = {
    addingTempCategory,
    setAddingTempCategory,
    errorCategoryMessage,
    setErrorCategoryMessage,
  }
  return <KeyboardContext.Provider value={value}>{children}</KeyboardContext.Provider>
}

export { KeyboardProvider, useKeyboard }
