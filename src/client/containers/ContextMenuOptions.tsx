import React, { useContext } from 'react'
import { ArrowUp, Download, Star, Trash, X, Edit2 } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { ContextMenuOption } from '@/components/NoteList/ContextMenuOption'
import { downloadNote, getNoteTitle } from '@/utils/helpers'
import {
  deleteNote,
  toggleFavoriteNote,
  toggleTrashedNote,
  addCategoryToNote,
  swapCategory,
  swapNote,
} from '@/slices/note'
import { getCategories } from '@/selectors'
import { CategoryItem, NoteItem } from '@/types'
import { ContextMenuEnum } from '@/utils/enums'
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
  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))

  // ===========================================================================
  // Context
  // ===========================================================================

  const { setOptionsId } = useContext(MenuUtilitiesContext)

  const startRename = () => {
    _setCategoryEdit(clickedCategory.id, clickedCategory.name)
    setOptionsId('')
  }
  const removeCategory = () => {
    _deleteCategory(clickedCategory.id)
  }

  return (
    <nav className="options-nav" data-testid={TestID.CATEGORY_OPTIONS_NAV}>
      <ContextMenuOption
        dataTestID={TestID.CATEGORY_OPTION_RENAME}
        handler={startRename}
        icon={Edit2}
        text={LabelText.RENAME}
      />
      <ContextMenuOption
        dataTestID={TestID.CATEGORY_OPTION_DELETE_PERMANENTLY}
        handler={removeCategory}
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

  const { categories } = useSelector(getCategories)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _deleteNote = (noteId: string) => dispatch(deleteNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const deleteNoteHandler = () => _deleteNote(clickedNote.id)
  const downloadNoteHandler = () =>
    downloadNote(
      getNoteTitle(clickedNote.text),
      clickedNote,
      categories.find((category: CategoryItem) => category.id === clickedNote.category)
    )
  const favoriteNoteHandler = () => _toggleFavoriteNote(clickedNote.id)
  const trashNoteHandler = () => _toggleTrashedNote(clickedNote.id)
  const removeCategoryHandler = () => {
    _addCategoryToNote('', clickedNote.id)
    _swapCategory('')
    _swapNote(clickedNote.id)
  }

  return (
    <nav className="options-nav" data-testid={TestID.NOTE_OPTIONS_NAV}>
      {clickedNote.trash ? (
        <>
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_DELETE_PERMANENTLY}
            handler={deleteNoteHandler}
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
      ) : clickedNote.scratchpad ? null : (
        <>
          <ContextMenuOption
            dataTestID={TestID.NOTE_OPTION_FAVORITE}
            handler={favoriteNoteHandler}
            icon={Star}
            text={clickedNote.favorite ? LabelText.REMOVE_FAVORITE : LabelText.MARK_AS_FAVORITE}
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
      <ContextMenuOption
        dataTestID={TestID.NOTE_OPTION_DOWNLOAD}
        handler={downloadNoteHandler}
        icon={Download}
        text={LabelText.DOWNLOAD}
      />
      {clickedNote.category && !clickedNote.trash && (
        <ContextMenuOption
          dataTestID={TestID.NOTE_OPTION_REMOVE_CATEGORY}
          handler={removeCategoryHandler}
          icon={X}
          text={LabelText.REMOVE_CATEGORY}
        />
      )}
    </nav>
  )
}
