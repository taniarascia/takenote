import { Folder } from 'constants/enums'

// `Record<Folder, string>` is preferable, but throws error `TS27411` (non-exhaustive matching)
export const folderMap: Record<string, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.FAVORITES]: 'Favorites',
  [Folder.TRASH]: 'Trash',
}
