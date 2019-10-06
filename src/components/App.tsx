import React from 'react'
import Navigation from 'containers/Navigation'
import AppSidebar from 'containers/AppSidebar'
import NoteList from 'containers/NoteList'
import NoteEditor from 'containers/NoteEditor'

const App: React.FC = () => {
  return (
    <div className="app">
      <AppSidebar />
      <NoteList />
      <NoteEditor />
      <Navigation />
    </div>
  )
}

export default App
