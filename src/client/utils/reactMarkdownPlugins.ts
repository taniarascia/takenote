import visit from 'unist-util-visit'

// This regexp will match any string starting with a # followed by 6 alphanumeric chars
// #k5b4m3, #j4n7k3, etc (substring of a note's UUID)
const noteUuidRegexp = /\{\{[a-z0-9]{6}\}\}/

const extractText = (string: string, start: number, end: number) => {
  const startLine = string.slice(0, start).split('\n')
  const endLine = string.slice(0, end).split('\n')

  return {
    type: 'text',
    value: string.slice(start, end),
    position: {
      start: {
        line: startLine.length,
        column: startLine[startLine.length - 1].length + 1,
      },
      end: {
        line: endLine.length,
        column: endLine[endLine.length - 1].length + 1,
      },
    },
  }
}

export const uuidPlugin = () => {
  function transformer(tree: any) {
    visit(tree, 'text', (node: any, position: any, parent: any) => {
      const definition = []
      let lastIndex = 0
      let match

      if ((match = noteUuidRegexp.exec(node.value)) !== null) {
        const value = match[0]
        const type = 'uuid'

        if (match.index !== lastIndex) {
          definition.push(extractText(node.value, lastIndex, match.index))
        }

        definition.push({
          type,
          value,
        })

        lastIndex = match.index + value.length
      }

      if (lastIndex !== node.value.length) {
        const text = extractText(node.value, lastIndex, node.value.length)
        definition.push(text)
      }

      if (!parent) return
      const last = parent.children.slice(position + 1)
      parent.children = parent.children.slice(0, position)
      parent.children = parent.children.concat(definition)
      parent.children = parent.children.concat(last)
    })
  }

  return transformer
}
