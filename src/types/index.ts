export interface NoteItem {
  id: string
  text: string
  created: string
  lastUpdated: string
}

export interface NoteState {
  notes: NoteItem[]
  loading: boolean
  active: string
  error: string
}
