import dayjs from 'dayjs'
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch, useSelector } from 'react-redux'

import { getActiveNote } from '@/utils/helpers'
import { updateNote } from '@/slices/note'
import { togglePreviewMarkdown } from '@/slices/settings'
import { NoteItem } from '@/types'
import { EmptyEditor } from '@/components/Editor/EmptyEditor'
import { PreviewEditor } from '@/components/Editor/PreviewEditor'
import { getSettings, getNotes } from '@/selectors'
import { setPendingSync } from '@/slices/sync'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'

export const NoteEditor: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { activeNoteId, loading, notes } = useSelector(getNotes)
  const { codeMirrorOptions, previewMarkdown } = useSelector(getSettings)

  const activeNote = getActiveNote(notes, activeNoteId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _updateNote = (note: NoteItem) => {
    dispatch(setPendingSync())
    dispatch(updateNote(note))
  }

  const renderEditor = () => {
    if (loading) {
      return <div className="empty-editor v-center">Loading...</div>
    } else if (!activeNote) {
      return <EmptyEditor />
    } else if (previewMarkdown)
      return (
        <PreviewEditor noteText={activeNote.text} togglePreviewMarkdown={_togglePreviewMarkdown} />
      )
    else {
      return (
        <>
          <CodeMirror
            data-testid="codemirror-editor"
            className="editor mousetrap"
            value={activeNote.text}
            options={codeMirrorOptions}
            editorDidMount={editor => {
              setTimeout(() => {
                editor.focus()
              }, 0)
              editor.setCursor(0)
            }}
            onBeforeChange={(editor, data, value) => {
              _updateNote({
                id: activeNote.id,
                text: value,
                created: activeNote.created,
                lastUpdated: dayjs().format(),
              })
            }}
            onChange={(editor, data, value) => {
              if (!value) {
                editor.focus()
              }
            }}
            onPaste={(editor, event: any) => {
              // Get around pasting issue
              // https://github.com/scniro/react-codemirror2/issues/77
              if (
                !event.clipboardData ||
                !event.clipboardData.items ||
                !event.clipboardData.items[0]
              )
                return
              event.clipboardData.items[0].getAsString((pasted: any) => {
                if (editor.getSelection() !== pasted) return
                const { anchor, head } = editor.listSelections()[0]
                editor.setCursor({
                  line: Math.max(anchor.line, head.line),
                  ch: Math.max(anchor.ch, head.ch),
                })
              })
            }}
          />
          <button className="preview-button" onClick={_togglePreviewMarkdown}>
            Preview
          </button>
        </>
      )
    }
  }

  return <main className="note-editor">{renderEditor()}</main>
}
