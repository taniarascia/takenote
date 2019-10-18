import { createSlice, Slice } from 'redux-starter-kit'

import { PreviewMarkdownState } from 'types'

const initialState: PreviewMarkdownState = {
  previewMarkdown: false,
}

const previewMarkdownSlice: Slice<PreviewMarkdownState> = createSlice({
  slice: 'previewMarkdown',
  initialState,
  reducers: {
    togglePreviewMarkdown: state => ({
      ...state,
      previewMarkdown: !state.previewMarkdown,
    }),
  },
})

export const { togglePreviewMarkdown } = previewMarkdownSlice.actions

export default previewMarkdownSlice.reducer
