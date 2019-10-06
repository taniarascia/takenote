import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Navigation from 'containers/Navigation'
import AppSidebar from 'containers/AppSidebar'
import NoteList from 'containers/NoteList'
import NoteEditor from 'containers/NoteEditor'
import { loadNotes, loadCategories } from 'actions'

interface AppProps {
  loadNotes: Function
  loadCategories: Function
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
      <AppSidebar />
      <NoteList />
      <NoteEditor />
      <Navigation />
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: () => dispatch(loadNotes()),
  loadCategories: () => dispatch(loadCategories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
