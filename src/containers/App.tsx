import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { loadCategories, loadNotes } from '../actions'
import { KeyboardProvider } from '../contexts/KeyboardContext'
import AppSidebar from './AppSidebar'
import KeyboardShortcuts from './KeyboardShortcuts'
import NoteEditor from './NoteEditor'
import NoteList from './NoteList'

interface AppProps {
  loadNotes: () => void
  loadCategories: () => void
}

const App: React.FC<AppProps> = ({ loadNotes, loadCategories }) => {
  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return (
    <div className="app">
      <KeyboardProvider>
        <AppSidebar />
        <NoteList />
        <NoteEditor />
        <KeyboardShortcuts />
      </KeyboardProvider>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: () => dispatch(loadNotes()),
  loadCategories: () => dispatch(loadCategories()),
})

export default connect(
  null,
  mapDispatchToProps
)(App)
