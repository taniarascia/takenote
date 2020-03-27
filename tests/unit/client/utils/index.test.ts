import { getNoteTitle, getWebsiteTitle } from '@/utils/helpers'
import { Folder } from '@/utils/enums'

describe('Utilities', () => {
  describe('getNoteTitle', () => {
    test(`should return 38 characters`, () => {
      const note = `This is your world. This is gonna be a happy little seascape. I'm gonna start with a little Alizarin crimson and a touch of Prussian blue`
      expect(getNoteTitle(note)).toEqual(note.slice(0, 38))
    })

    test(`should trim both ends`, () => {
      const note = ` This is your world. This is gonna be a `
      expect(getNoteTitle(note)).toEqual(`This is your world. This is gonna be a`)
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
})
