import moment from 'moment'
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'

import { updateNote } from 'slices/note'
import { togglePreviewMarkdown } from 'slices/previewMarkdown'
import { updateVimStateMode } from 'slices/settings'
import { RootState, NoteItem, VimModes } from 'types'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/vim'

const NoteEditor: React.FC = () => {
  const { activeNoteId, loading, notes } = useSelector((state: RootState) => state.noteState)
  const { codeMirrorOptions, vimState } = useSelector((state: RootState) => state.settingsState)
  const { previewMarkdown } = useSelector((state: RootState) => state.previewMarkdown)

  const activeNote = notes.find(note => note.id === activeNoteId)

  const dispatch = useDispatch()

  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _updateNote = (note: NoteItem) => dispatch(updateNote(note))
  const _updateVimStateMode = (vimMode: VimModes) => dispatch(updateVimStateMode(vimMode))

  if (loading) {
    return <div className="empty-editor v-center">Loading...</div>
  } else if (!activeNote) {
    return (
      <div className="empty-editor v-center">
        <div className="text-center">
          <p>
            <strong>Create a note</strong>
          </p>
          <p>
            <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
          </p>
        </div>
      </div>
    )
  } else if (previewMarkdown) {
    return (
      <>
        <ReactMarkdown className="previewer" source={activeNote.text} />
        <button className="preview-button" onClick={_togglePreviewMarkdown}>
          Preview <X size={12} />
        </button>
      </>
    )
  } else {
    return (
      <CodeMirror
        className={`editor mousetrap ${vimState.mode === VimModes.insert ? 'vim-insert-mode' : ''}`}
        value={activeNote.text}
        options={codeMirrorOptions}
        editorDidMount={editor => {
          editor.focus()
          editor.setCursor(0)
        }}
        onKeyUp={editor => {
          if (editor.state.vim) {
            _updateVimStateMode(editor.state.vim.insertMode ? VimModes.insert : VimModes.default)
          }
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
          if (value) {
            editor.focus()
          }
        }}
      />
    )
  }
}

export default NoteEditor
