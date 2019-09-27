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

interface NoteEditorProps {
  loading: boolean
  note: NoteItem
  updateNote: Function
  loadNotes: Function
}

const NoteEditor: React.FC<NoteEditorProps> = ({ loading, note, updateNote, loadNotes }) => {
  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  if (loading) {
    return <div>Loading...</div>
  } else {
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
}

const mapStateToProps = state => ({
  loading: state.noteState.loading,
  note: state.noteState.data.find(note => note.id === state.noteState.active),
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
