import moment from 'moment'
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch, useSelector } from 'react-redux'

import { updateNote } from 'slices/note'
import { RootState, NoteItem } from 'types'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/zenburn.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/vim'

const NoteEditor: React.FC = () => {
  const { activeNoteId, loading, notes } = useSelector((state: RootState) => state.noteState)
  const { codeMirrorOptions } = useSelector((state: RootState) => state.settingsState)

  const activeNote = notes.find(note => note.id === activeNoteId)

  const dispatch = useDispatch()

  const _updateNote = (note: NoteItem) => dispatch(updateNote(note))

  if (loading) {
    return <div className="empty-editor v-center">Loading...</div>
  } else if (!activeNote) {
    return <div className="empty-editor v-center" />
  } else {
    return (
      <CodeMirror
        onDragOver={(editor, event) => {
          event.preventDefault()
          console.log(editor)
        }}
        className="editor mousetrap"
        value={activeNote.text}
        options={codeMirrorOptions}
        editorDidMount={editor => {
          editor.focus()
          editor.setCursor(0)
        }}
        onBeforeChange={(editor, data, value) => {
          _updateNote({
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

export default NoteEditor
