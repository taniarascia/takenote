import { createSlice, Slice, PayloadAction } from 'redux-starter-kit'

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
    loadPreviewMarkdown: () => initialState,
    loadPreviewMarkdownError: state => ({
      ...state,
    }),
    loadPreviewMarkdownSuccess: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      previewMarkdown: payload,
    }),
  },
})

export const {
  togglePreviewMarkdown,
  loadPreviewMarkdown,
  loadPreviewMarkdownError,
  loadPreviewMarkdownSuccess,
} = previewMarkdownSlice.actions

export default previewMarkdownSlice.reducer
