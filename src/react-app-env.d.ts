/// <reference types="react-scripts" />

declare module 'mousetrap'
declare module '*.md' {
  const content: string
  export default content
}
