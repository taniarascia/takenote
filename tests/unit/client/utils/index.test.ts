import dayjs from 'dayjs'

import { getNoteTitle, getWebsiteTitle, getActiveNoteFromShortUuid } from '@/utils/helpers'
import { Folder } from '@/utils/enums'
import { NoteItem, CategoryItem } from '@/types'

describe('Utilities', () => {
  describe('getNoteTitle', () => {
    test(`should return 45 characters`, () => {
      const note = `This is your world. This is gonna be a happy little seascape. I'm gonna start with a little Alizarin crimson and a touch of Prussian blue`
      expect(getNoteTitle(note)).toEqual(note.slice(0, 45).trim())
    })

    test(`should trim both ends`, () => {
      const note = ` This is your world. This is gonna be a happy `
      expect(getNoteTitle(note)).toEqual(`This is your world. This is gonna be a happy`)
    })

    test(`should only return the first line`, () => {
      const note = `Something
      
      and something else`
      expect(getNoteTitle(note)).toEqual(`Something`)
    })

    test(`should not display a hash`, () => {
      const note = `# Something
      
  and something else`
      expect(getNoteTitle(note)).toEqual(`Something`)
    })

    test(`should ignore newlines in the beginning`, () => {
      const note = `
      
  Something
      
  and something else`
      expect(getNoteTitle(note)).toEqual(`Something`)
    })
  })

  describe('getWebsiteTitle', () => {
    test(`should display the folder name followed by the app name`, () => {
      expect(getWebsiteTitle(Folder.ALL)).toEqual(`All Notes | TakeNote`)
      expect(getWebsiteTitle(Folder.FAVORITES)).toEqual(`Favorites | TakeNote`)
      expect(getWebsiteTitle(Folder.TRASH)).toEqual(`Trash | TakeNote`)
    })

    test(`should display the category name followed by the app name`, () => {
      const category = {
        id: '123',
        name: 'Recipes',
        draggedOver: false,
      }

      expect(getWebsiteTitle(Folder.CATEGORY, category)).toEqual(`Recipes | TakeNote`)
    })
  })

  const newNote = (id: string): NoteItem => ({
    id: id,
    text: '',
    created: dayjs().format(),
    lastUpdated: dayjs().format(),
  })
  describe('getActiveNoteFromShortUuid', () => {
    test(`should get active note from short`, () => {
      const activeNoteId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
      const shortActiveNoteId = '6ec0bd'
      const othernoteId = '710b962e-041c-11e1-9234-0123456789ab'

      const activenote: NoteItem = newNote(activeNoteId)

      const othernote: NoteItem = newNote(othernoteId)

      const notes = [activenote, othernote]

      expect(getActiveNoteFromShortUuid(notes, shortActiveNoteId)).toEqual(activenote)
    })

    test(`should get active note from short with braces`, () => {
      const activeNoteId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
      const shortActiveNoteId = '{{6ec0bd}}'
      const otherNoteId = '710b962e-041c-11e1-9234-0123456789ab'

      const activeNote: NoteItem = newNote(activeNoteId)

      const otherNote: NoteItem = newNote(otherNoteId)

      const notes = [activeNote, otherNote]

      expect(getActiveNoteFromShortUuid(notes, shortActiveNoteId)).toEqual(activeNote)
    })

    test(`should not get active note if not present`, () => {
      const shortActiveNoteId = '6ec0bd'
      const oneNoteId = '109156be-c4fb-41ea-b1b4-efe1671c5836'
      const otherNoteId = '710b962e-041c-11e1-9234-0123456789ab'

      const oneNote: NoteItem = newNote(oneNoteId)

      const otherNote: NoteItem = newNote(otherNoteId)

      const notes = [oneNote, otherNote]

      expect(getActiveNoteFromShortUuid(notes, shortActiveNoteId)).toEqual(undefined)
    })
  })
})
