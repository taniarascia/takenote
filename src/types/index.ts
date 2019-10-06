export interface NoteItem {
  id: string
  text: string
  created: string
  lastUpdated: string
}

export interface NoteState {
  notes: NoteItem[]
  active: string
  error: string
  loading: boolean
  syncing: boolean
}
