// testHelperEnums.ts
// Default enumerated values that can be used in tests

const entryPoint = '/app'

const dynamicTimeCategoryName = `Cy${Date.now()}`

// data-test-IDs
enum TestIDEnum {
  ACTIVE_NOTE = 'active-note',
  ADD_CATEGORY_BUTTON = 'add-category-button',
  EMPTY_TRASH_BUTTON = 'empty-trash-button',
  FOLDER_ALL_NOTES = 'all-notes',
  FOLDER_FAVORITES = 'favorites',
  FOLDER_TRASH = 'trash',
  INACTIVE_NOTE = 'inactive-note',
  NEW_CATEGORY_FORM = 'new-category-form',
  NEW_CATEGORY_INPUT = 'new-category-label',
  NOTE_LIST = 'note-list',
  NOTE_LIST_ITEM = 'note-list-item-',
  NOTE_OPTIONS_DIV = 'note-options-div-',
  NOTE_OPTIONS_NAV = 'note-options-nav',
  NOTE_OPTION_DELETE_PERMANENTLY = 'note-option-delete-permanently',
  NOTE_OPTION_DOWNLOAD = 'note-option-download',
  NOTE_OPTION_FAVORITE = 'note-option-favorite',
  NOTE_OPTION_REMOVE_CATEGORY = 'note-option-remove-category',
  NOTE_OPTION_RESTORE_FROM_TRASH = 'note-option-restore-from-trash',
  NOTE_OPTION_TRASH = 'note-option-trash',
  NOTE_SEARCH = 'note-search',
  NOTE_TITLE = 'note-title-',
  MOVE_TO_CATEGORY = 'note-options-move-to-category-select',
  REMOVE_CATEGORY = 'remove-category',
  SIDEBAR_ACTION_CREATE_NEW_NOTE = 'sidebar-action-create-new-note',
  SIDEBAR_ACTION_SETTINGS = 'sidebar-action-settings',
  SIDEBAR_ACTION_SYNC_NOTES = 'sidebar-action-sync-notes',
}

// Default Labels

enum TextEnum {
  ADD_CATEGORY = 'Add Category',
  ALL_NOTES = 'All Notes',
  CREATE_NEW_NOTE = 'Create new note',
  DELETE_PERMANENTLY = 'Delete permanently',
  DOWNLOAD = 'Download',
  MARK_AS_FAVORITE = 'Mark as favorite',
  MOVE_TO_TRASH = 'Move to trash',
  NEW_CATEGORY = 'New category...',
  NEW_NOTE = 'New note',
  REMOVE_CATEGORY = 'Remove category',
  REMOVE_FAVORITE = 'Remove favorite',
  RESTORE_FROM_TRASH = 'Restore from trash',
  SETTINGS = 'Settings',
  SYNC_NOTES = 'Sync notes',
  WELCOME_TO_TAKENOTE = 'Welcome to Takenote!',
}

export { entryPoint, dynamicTimeCategoryName, TestIDEnum, TextEnum }
