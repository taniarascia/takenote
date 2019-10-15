import moment from 'moment'
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { updateNote } from 'slices/note'
import { ApplicationState, NoteItem } from 'types'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/zenburn.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/vim'

interface NoteEditorProps {
  loading: boolean
  activeNote?: NoteItem
  updateNote: (note: NoteItem) => void
  codeMirrorOptions: { [key: string]: any }
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  loading,
  activeNote,
  updateNote,
  codeMirrorOptions,
}) => {
  if (loading) {
    return <div className="empty-editor vcenter">Loading...</div>
  } else if (!activeNote) {
    return <div className="empty-editor vcenter" />
  } else {
    return (
      <CodeMirror
        className="editor mousetrap"
        value={activeNote.text}
        options={codeMirrorOptions}
        editorDidMount={editor => {
          editor.focus()
          editor.setCursor(0)
        }}
        onBeforeChange={(editor, data, value) => {
          updateNote({
            id: activeNote.id,
            text: value,
            created: activeNote.created,
            lastUpdated: moment().format(),
          })
        }}
        onChange={(editor, data, value) => {
          if (activeNote && activeNote.text === '') {
            editor.focus()
          }
        }}
      />
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loading: state.noteState.loading,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.activeNoteId),
  codeMirrorOptions: state.settingsState.codeMirrorOptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNote: (note: NoteItem) => dispatch(updateNote(note)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
