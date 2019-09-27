import React from 'react'
import NoteList from '../containers/NoteList'
import NoteEditor from '../containers/NoteEditor'

const App: React.FC = () => {
  return (
    <div className="app">
      <NoteList />
      <NoteEditor />
    </div>
  )
}

export default App
