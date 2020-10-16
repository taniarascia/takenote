import React, { createContext, FunctionComponent, useContext, useState } from 'react'

interface TempStateContextInterface {
  addingTempCategory: boolean
  setAddingTempCategory(adding: boolean): void
}

const initialContextValue = {
  addingTempCategory: false,
  setAddingTempCategory: (adding: boolean) => undefined,
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

  const value: TempStateContextInterface = {
    addingTempCategory,
    setAddingTempCategory,
  }

  return <TempStateContext.Provider value={value}>{children}</TempStateContext.Provider>
}

export { TempStateProvider, useTempState }
