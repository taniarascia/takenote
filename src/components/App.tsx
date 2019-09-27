import React from 'react'
import Navigation from 'containers/Navigation'
import NoteList from 'containers/NoteList'
import NoteEditor from 'containers/NoteEditor'

const App: React.FC = () => {
  return (
    <div className="app">
      <NoteList />
      <NoteEditor />
      <Navigation />
    </div>
  )
}

export default App
