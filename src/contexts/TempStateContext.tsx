import React, { createContext, FunctionComponent, useContext, useState } from 'react'

interface TempStateContextInterface {
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

const TempStateContext = createContext<TempStateContextInterface>(initialContextValue)
const useTempState = () => {
  const context = useContext(TempStateContext)

  if (!context) {
    throw new Error('useTempState must be used within a TempStateContext')
  }
  return context
}
const TempStateProvider: FunctionComponent = ({ children }) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [errorCategoryMessage, setErrorCategoryMessage] = useState('')

  const value: TempStateContextInterface = {
    addingTempCategory,
    setAddingTempCategory,
    errorCategoryMessage,
    setErrorCategoryMessage,
  }
  return <TempStateContext.Provider value={value}>{children}</TempStateContext.Provider>
}

export { TempStateProvider, useTempState }
