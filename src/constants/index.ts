import { Folder } from 'constants/enums'

// `Record<Folder, string>` is preferable, but throws error `TS27411` (non-exhaustive matching)
export const folderMap: Record<string, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.TRASH]: 'Trash',
  [Folder.FAVORITES]: 'Favorites',
}
