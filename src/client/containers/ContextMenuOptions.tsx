import React, { useContext } from 'react'
import { ArrowUp, Download, Star, Trash, X, Edit2 } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { StringEnum } from '@resources/StringEnum'

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
  const { setOptionsId } = useContext(MenuUtilitiesContext)
  const dispatch = useDispatch()

  const _deleteCategory = (categoryId: string) => dispatch(deleteCategory(categoryId))
  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))

  const startRename = () => {
    _setCategoryEdit(clickedCategory.id, clickedCategory.name)
    setOptionsId('')
  }
  const removeCategory = () => {
    _deleteCategory(clickedCategory.id)
  }

  return (
    <nav className="options-nav" data-testid="category-options-nav">
      <ContextMenuOption
        dataTestID="category-options-rename"
        handler={startRename}
        icon={Edit2}
        text={StringEnum.RENAME}
      />
      <ContextMenuOption
        dataTestID="category-option-delete-permanently"
        handler={removeCategory}
        icon={X}
        text={StringEnum.DELETE_PERMANENTLY}
        optionType="delete"
      />
    </nav>
  )
}

interface NotesOptionsProps {
  clickedNote: NoteItem
}

const NotesOptions: React.FC<NotesOptionsProps> = ({ clickedNote }) => {
  const dispatch = useDispatch()

  const _deleteNote = (noteId: string) => dispatch(deleteNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))

  const { categories } = useSelector(getCategories)

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
    <nav className="options-nav" data-testid="note-options-nav">
      {clickedNote.trash ? (
        <>
          <ContextMenuOption
            dataTestID="note-option-delete-permanently"
            handler={deleteNoteHandler}
            icon={X}
            text={StringEnum.DELETE_PERMANENTLY}
            optionType="delete"
          />
          <ContextMenuOption
            dataTestID="note-option-restore-from-trash"
            handler={trashNoteHandler}
            icon={ArrowUp}
            text={StringEnum.RESTORE_FROM_TRASH}
          />
        </>
      ) : clickedNote.scratchpad ? null : (
        <>
          <ContextMenuOption
            dataTestID="note-option-favorite"
            handler={favoriteNoteHandler}
            icon={Star}
            text={clickedNote.favorite ? StringEnum.REMOVE_FAVORITE : StringEnum.MARK_AS_FAVORITE}
          />
          <ContextMenuOption
            dataTestID="note-option-trash"
            handler={trashNoteHandler}
            icon={Trash}
            text={StringEnum.MOVE_TO_TRASH}
            optionType="delete"
          />
        </>
      )}
      <ContextMenuOption
        dataTestID="note-options-download"
        handler={downloadNoteHandler}
        icon={Download}
        text={StringEnum.DOWNLOAD}
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
