import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { updateNote, loadNotes } from 'actions'
import { NoteItem } from 'types'

import options from 'constants/codeMirrorOptions'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/addon/selection/active-line.js'

interface NoteEditorProps {
  loading: boolean
  activeNote: NoteItem
  updateNote: Function
  loadNotes: Function
}

const NoteEditor: React.FC<NoteEditorProps> = ({ loading, activeNote, updateNote, loadNotes }) => {
  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  if (loading) {
    return <div className="editor" />
  } else if (!activeNote) {
    return <div>Create your first note!</div>
  } else {
    return (
      <CodeMirror
        className="editor"
        value={activeNote.text}
        options={options}
        editorDidMount={editor => {
          editor.focus()
          editor.setCursor(editor.lineCount(), 0)
        }}
        onBeforeChange={(editor, data, value) => {
          updateNote({ id: activeNote.id, text: value })
        }}
        onChange={(editor, data, value) => {
          editor.focus()
          editor.setCursor(editor.lineCount(), 0)
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.noteState.loading,
  activeNote: state.noteState.data.find(note => note.id === state.noteState.active),
  notes: state.noteState.data,
  active: state.noteState.active,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: () => dispatch(loadNotes()),
  updateNote: note => dispatch(updateNote(note)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
