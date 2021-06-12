import dayjs from 'dayjs'
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch, useSelector } from 'react-redux'

import { getActiveNote } from '@/utils/helpers'
import { updateNote } from '@/slices/note'
import { NoteItem } from '@/types'
import { NoteMenuBar } from '@/containers/NoteMenuBar'
import { EmptyEditor } from '@/components/Editor/EmptyEditor'
import { PreviewEditor } from '@/components/Editor/PreviewEditor'
import { getSync, getSettings, getNotes } from '@/selectors'
import { setPendingSync } from '@/slices/sync'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/scrollpastend'
import { urlElementConstants } from '@/utils/constants'

export const NoteEditor: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { pendingSync } = useSelector(getSync)
  const { activeNoteId, loading, notes } = useSelector(getNotes)
  const { codeMirrorOptions, previewMarkdown } = useSelector(getSettings)

  const activeNote = getActiveNote(notes, activeNoteId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const addUrlElementListener = () => {
    const urlElements: any = document.getElementsByClassName(urlElementConstants.className) || []
    if (!urlElements || !urlElements.length) {
      return
    }
    for (const urlElement of urlElements) {
      if (!urlElement) {
        return
      }
      urlElement.addEventListener('mouseover', (e: any) => {
        urlElement.style.textDecoration = 'underline'
        urlElement.title = urlElementConstants.tooltip
        if (e.ctrlKey) {
          urlElement.style.cursor = 'pointer'
        } else {
          urlElement.style.cursor = 'inherit'
        }
      })
      urlElement.addEventListener('mouseleave', () => {
        urlElement.style.textDecoration = 'none'
        urlElement.style.cursor = 'inherit'
      })
      urlElement.addEventListener('mousedown', (e: any) => {
        if (!e.ctrlKey) {
          return
        }
        const [url] = e.target.innerText.match(urlElementConstants.urlRegex) || []
        if (url) window.open(url.replace(')', ''), '_blank')
      })
    }
  }

  const _updateNote = (note: NoteItem) => {
    !pendingSync && dispatch(setPendingSync())
    dispatch(updateNote(note))
    addUrlElementListener()
  }

  const removeUrlElementListener = () => {
    const urlElements: any = document.getElementsByClassName(urlElementConstants.className) || []
    if (!urlElements || !urlElements.length) {
      return
    }
    for (const urlElement of urlElements) {
      if (!urlElement) {
        return
      }
      urlElement.removeEventListener('mouseover')
      urlElement.removeEventListener('mouseleave')
      urlElement.removeEventListener('click')
    }
  }

  const renderEditor = () => {
    if (loading) {
      return <div className="empty-editor v-center">Loading...</div>
    } else if (!activeNote) {
      return <EmptyEditor />
    } else if (previewMarkdown) {
      return (
        <PreviewEditor
          directionText={codeMirrorOptions.direction}
          noteText={activeNote.text}
          notes={notes}
        />
      )
    }

    return (
      <CodeMirror
        data-testid="codemirror-editor"
        className="editor mousetrap"
        value={activeNote.text}
        options={codeMirrorOptions}
        editorWillUnmount={() => {
          removeUrlElementListener()
        }}
        editorDidMount={(editor) => {
          setTimeout(() => {
            editor.focus()
          }, 0)
          editor.setCursor(0)
          addUrlElementListener()
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
          if (!event.clipboardData || !event.clipboardData.items || !event.clipboardData.items[0])
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
    )
  }

  return (
    <main className="note-editor">
      <NoteMenuBar />
      {renderEditor()}
    </main>
  )
}
