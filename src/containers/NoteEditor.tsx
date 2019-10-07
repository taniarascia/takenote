import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { updateNote } from 'actions'
import { NoteItem } from 'types'

import options from 'constants/codeMirrorOptions'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/addon/selection/active-line.js'

interface UpdateNoteParams {
  id: string
  text: string
}

interface NoteEditorProps {
  loading: boolean
  activeNote: NoteItem
  updateNote: (params: UpdateNoteParams) => void
}

const NoteEditor: React.FC<NoteEditorProps> = ({ loading, activeNote, updateNote }) => {
  if (loading) {
    return <div className="empty-editor" />
  } else if (!activeNote) {
    return <div className="empty-editor vcenter">Create your first note!</div>
  } else {
    return (
      <CodeMirror
        className="editor mousetrap"
        value={activeNote.text}
        options={options}
        editorDidMount={editor => {
          editor.focus()
        }}
        onBeforeChange={(editor, data, value) => {
          updateNote({ id: activeNote.id, text: value })
        }}
        onChange={(editor, data, value) => {}}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.noteState.loading,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.active),
  notes: state.noteState.notes,
  active: state.noteState.active,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNote: note => dispatch(updateNote(note)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
