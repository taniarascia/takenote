export interface NoteItem {
  id: string
  text: string
  created: string
  lastUpdated: string
}

export interface NoteState {
  data: NoteItem[]
  loading: boolean
  active: string
  error: string
}
