// testHelperEnums.ts
// Default enumerated values that can be used in tests

const entryPoint = '/app'

const dynamicTimeCategoryName = `Cy${Date.now()}`

// data-test-IDs
enum TestIDEnum {
  ALL_NOTES = 'all-notes',
  ACTIVE_NOTE = 'active-note',
  CREATE_NEW_NOTE_SIDEBAR_ACTION = 'create-new-note-sidebar-action',
  EMPTY_TRASH_BUTTON = 'empty-trash-button',
  FAVORITES = 'favorites',
  INACTIVE_NOTE = 'inactive-note',
  NOTE_LIST = 'note-list',
  NOTE_OPTIONS = 'note-options-div',
  NOTE_OPTIONS_NAV = 'note-options-nav',
  NOTE_OPTION_DELETE_PERMANENTLY = 'note-option-delete-permanently',
  NOTE_OPTION_DOWNLOAD = 'note-option-download',
  NOTE_OPTION_FAVORITE = 'note-option-favorite',
  NOTE_OPTION_REMOVE_CATEGORY = 'note-option-remove-category',
  NOTE_OPTION_RESTORE_FROM_TRASH = 'note-option-restore-from-trash',
  NOTE_OPTION_TRASH = 'note-option-trash',
  NOTE_TRASH = 'trash',
  MOVE_TO_CATEGORY = 'note-options-move-to-category-select',
  SETTINGS_SIDEBAR_ACTION = 'settings-sidebar-action',
  SYNC_NOTES_SIDEBAR_ACTION = 'sync-notes-sidebar-action',
}

const wrapWithTestIDTag = (testIDEnum: TestIDEnum | string) => {
  return '[data-testid="' + testIDEnum + '"]'
}

const getTestID = (testIDEnum: TestIDEnum) => {
  return cy.get(wrapWithTestIDTag(testIDEnum))
}

// Default Labels

enum TextEnum {
  ADD_CATEGORY = 'Add category',
  ALL_NOTES = 'All Notes',
  CREATE_NEW_NOTE = 'Create new note',
  DELETE_PERMANENTLY = 'Delete permanently',
  DOWNLOAD = 'Download',
  MARK_AS_FAVORITE = 'Mark as favorite',
  MOVE_TO_TRASH = 'Move to trash',
  NEW_CATEGORY = 'New category...',
  NEW_NOTE = 'New Note',
  REMOVE_CATEGORY = 'Remove category',
  REMOVE_FAVORITE = 'Remove favorite',
  RESTORE_FROM_TRASH = 'Restore from trash',
  SETTINGS = 'Settings',
  SYNC_NOTES = 'Sync notes',
}

export { entryPoint, dynamicTimeCategoryName, getTestID, TestIDEnum, TextEnum, wrapWithTestIDTag }
