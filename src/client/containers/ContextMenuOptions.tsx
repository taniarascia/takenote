import React, { useContext } from 'react'
import { ArrowUp, Download, Star, Trash, X, Edit2, Clipboard } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'
import { ContextMenuOption } from '@/components/NoteList/ContextMenuOption'
import { downloadNotes, isDraftNote, getShortUuid, copyToClipboard } from '@/utils/helpers'
import {
  deleteNotes,
  toggleFavoriteNotes,
  toggleTrashNotes,
  addCategoryToNote,
  updateActiveNote,
  swapFolder,
} from '@/slices/note'
import { getCategories, getNotes } from '@/selectors'
import { Folder, ContextMenuEnum } from '@/utils/enums'
import { CategoryItem, NoteItem } from '@/types'
import { setCategoryEdit, deleteCategory } from '@/slices/category'
import { MenuUtilitiesContext } from '@/containers/ContextMenu'

export interface ContextMenuOptionsProps {
  clickedItem: NoteItem | CategoryItem
  type: ContextMenuEnum
}

export const ContextMenuOptions: React.FC<ContextMenuOptionsProps> = ({ clickedItem, type }) => {
  if (type === 'CATEGORY') {
    return <CategoryOptions clickedCategory={clickedItem as CategoryItem} />
  } else {
    return <NotesOptions clickedNote={clickedItem as NoteItem} />
  }
}

interface CategoryOptionsProps {
  clickedCategory: CategoryItem
}

const CategoryOptions: React.FC<CategoryOptionsProps> = ({ clickedCategory }) => {
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _deleteCategory = (categoryId: string) => dispatch(deleteCategory(categoryId))
  const _swapFolder = (categoryId: string) => dispatch(swapFolder(Folder.ALL))
  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))

  // ===========================================================================
  // Context
  // ===========================================================================

  const { setOptionsId } = useContext(MenuUtilitiesContext)

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const startRenameHandler = () => {
    _setCategoryEdit(clickedCategory.id, clickedCategory.name)
    setOptionsId('')
  }
  const removeCategoryHandler = () => {
    _deleteCategory(clickedCategory.id)
    _swapFolder('')
  }

  return (
    <nav className="options-nav" data-testid={TestID.CATEGORY_OPTIONS_NAV}>
      <ContextMenuOption
        dataTestID={TestID.CATEGORY_OPTION_RENAME}
        handler={startRenameHandler}
        icon={Edit2}
        text={LabelText.RENAME}
      />
      <ContextMenuOption
        dataTestID={TestID.CATEGORY_OPTION_DELETE_PERMANENTLY}
        handler={removeCategoryHandler}
        icon={X}
        text={LabelText.DELETE_PERMANENTLY}
        optionType="delete"
      />
    </nav>
  )
}

interface NotesOptionsProps {
  clickedNote: NoteItem
}

const NotesOptions: React.FC<NotesOptionsProps> = ({ clickedNote }) => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { selectedNotesIds, notes } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)

  const selectedNotes = notes.filter((note) => selectedNotesIds.includes(note.id))
  const isSelectedNotesDiffFavor = Boolean(
    selectedNotes.find((note) => note.favorite) && selectedNotes.find((note) => !note.favorite)
  )

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _deleteNotes = (noteIds: string[]) => dispatch(deleteNotes(noteIds))
  const _toggleTrashNotes = (noteId: string) => dispatch(toggleTrashNotes(noteId))
  const _toggleFavoriteNotes = (noteId: string) => dispatch(toggleFavoriteNotes(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const deleteNotesHandler = () => _deleteNotes(selectedNotesIds)
  const downloadNotesHandler = () =>
    downloadNotes(
      selectedNotesIds.includes(clickedNote.id) ? selectedNotes : [clickedNote],
      categories
    )
  const favoriteNoteHandler = () => _toggleFavoriteNotes(clickedNote.id)
  const trashNoteHandler = () => _toggleTrashNotes(clickedNote.id)
  const removeCategoryFromNoteHandler = () => {
    _addCategoryToNote('', clickedNote.id)
    _updateActiveNote(clickedNote.id, false)
  }
  const copyLinkedNoteMarkdownHandler = (e: React.SyntheticEvent, note: NoteItem) => {
    e.preventDefault()

    const shortNoteUuid = getShortUuid(note.id)
    copyToClipboard(`{{${shortNoteUuid}}}`)
  }

  return !isDraftNote(clickedNote) ? (
    <nav className="options-nav" data-testid={TestID.NOTE_OPTIONS_NAV}>
      {clickedNote.trash && (
        <>
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_DELETE_PERMANENTLY}
            handler={deleteNotesHandler}
            icon={X}
            text={LabelText.DELETE_PERMANENTLY}
            optionType="delete"
          />
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_RESTORE_FROM_TRASH}
            handler={trashNoteHandler}
            icon={ArrowUp}
            text={LabelText.RESTORE_FROM_TRASH}
          />
        </>
      )}
      {!clickedNote.scratchpad && !clickedNote.trash && (
        <>
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_FAVORITE}
            handler={favoriteNoteHandler}
            icon={Star}
            text={
              isSelectedNotesDiffFavor
                ? LabelText.TOGGLE_FAVORITE
                : clickedNote.favorite
                ? LabelText.REMOVE_FAVORITE
                : LabelText.MARK_AS_FAVORITE
            }
          />
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_TRASH}
            handler={trashNoteHandler}
            icon={Trash}
            text={LabelText.MOVE_TO_TRASH}
            optionType="delete"
          />
        </>
      )}
      {clickedNote.category && !clickedNote.trash && (
        <ContextMenuOption
          dataTestID={TestID.NOTE_OPTION_REMOVE_CATEGORY}
          handler={removeCategoryFromNoteHandler}
          icon={X}
          text={LabelText.REMOVE_CATEGORY}
        />
      )}
      <ContextMenuOption
        dataTestID={TestID.NOTE_OPTION_DOWNLOAD}
        handler={downloadNotesHandler}
        icon={Download}
        text={LabelText.DOWNLOAD}
      />
      <ContextMenuOption
        dataTestID={TestID.COPY_REFERENCE_TO_NOTE}
        handler={(e: React.SyntheticEvent) => copyLinkedNoteMarkdownHandler(e, clickedNote)}
        icon={Clipboard}
        text={LabelText.COPY_REFERENCE_TO_NOTE}
      />
    </nav>
  ) : null
}
