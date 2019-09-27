import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { updateNote, swapNote } from '../actions'
import options from '../constants/codeMirrorOptions'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/gfm/gfm.js'

interface NoteObject {
  uuid: string
  text: string
}

interface NoteProps {
  note: NoteObject
  updateNote: Function
  swapNote: Function
}

class NoteEditor extends Component<NoteProps> {
  state = {
    value: '',
  }

  render() {
    const { note, updateNote, swapNote } = this.props

    return (
      <CodeMirror
        className="editor"
        value={note.text}
        options={options}
        onBeforeChange={(editor, data, value) => {
          updateNote(note.text)
        }}
        onChange={(editor, data, value) => {}}
      />
    )
  }
}

const mapStateToProps = state => ({
  note: state.notes.find(note => note.id === state.active),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNote: note => dispatch(updateNote(note)),
  swapNote: id => dispatch(swapNote(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)
