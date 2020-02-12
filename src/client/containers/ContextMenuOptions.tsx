import React from 'react'
import { ArrowUp, Download, Star, Trash, X } from 'react-feather'
import { useDispatch } from 'react-redux'

import { ContextMenuOption } from '@/components/NoteList/ContextMenuOption'
import { downloadNote, getNoteTitle } from '@/helpers'
import {
  deleteNote,
  toggleFavoriteNote,
  toggleTrashedNote,
  addCategoryToNote,
  swapCategory,
  swapNote,
} from '@/slices/note'
import { NoteItem } from '@/types'

export interface ContextMenuOptionsProps {
  clickedNote: NoteItem
}

export const ContextMenuOptions: React.FC<ContextMenuOptionsProps> = ({ clickedNote }) => {
  const dispatch = useDispatch()

  const _deleteNote = (noteId: string) => dispatch(deleteNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

  const deleteNoteHandler = () => _deleteNote(clickedNote.id)
  const downloadNoteHandler = () => downloadNote(getNoteTitle(clickedNote.text), clickedNote)
  const favoriteNoteHandler = () => _toggleFavoriteNote(clickedNote.id)
  const trashNoteHandler = () => _toggleTrashedNote(clickedNote.id)
  const removeCategoryHandler = () => {
    _addCategoryToNote('', clickedNote.id)
    _swapCategory('')
    _swapNote(clickedNote.id)
  }

  return (
    <nav className="note-options-nav" data-testid="note-options-nav">
      {clickedNote.trash ? (
        <>
          <ContextMenuOption
            dataTestID="note-option-delete-permanently"
            handler={deleteNoteHandler}
            icon={X}
            text="Delete permanently"
            optionType="delete"
          />
          <ContextMenuOption
            dataTestID="note-option-restore-from-trash"
            handler={trashNoteHandler}
            icon={ArrowUp}
            text="Restore from trash"
          />
        </>
      ) : (
        <>
          <ContextMenuOption
            dataTestID="note-option-favorite"
            handler={favoriteNoteHandler}
            icon={Star}
            text={clickedNote.favorite ? 'Remove favorite' : 'Mark as favorite'}
          />
          <ContextMenuOption
            dataTestID="note-option-trash"
            handler={trashNoteHandler}
            icon={Trash}
            text="Move to trash"
            optionType="delete"
          />
        </>
      )}
      <ContextMenuOption
        dataTestID="note-options-download"
        handler={downloadNoteHandler}
        icon={Download}
        text="Download"
      />
      {clickedNote.category && !clickedNote.trash && (
        <ContextMenuOption
          dataTestID="note-option-remove-category"
          handler={removeCategoryHandler}
          icon={X}
          text="Remove category"
        />
      )}
    </nav>
  )
}
