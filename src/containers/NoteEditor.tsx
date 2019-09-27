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

interface NoteEditorProps {
  note: NoteItem
  updateNote: Function
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, updateNote }) => {
  return (
    <CodeMirror
      className="editor"
      value={note.text}
      options={options}
      onBeforeChange={(editor, data, value) => {
        updateNote({ id: note.id, text: value })
      }}
      onChange={(editor, data, value) => {}}
    />
  )
}

const mapStateToProps = state => ({
  note: state.notes.find(note => note.id === state.active),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNote: note => dispatch(updateNote(note)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
