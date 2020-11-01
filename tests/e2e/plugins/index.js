const clipboardy = require('clipboardy')

const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

module.exports = (on) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)

  on('task', {
    getClipboard() {
      return clipboardy.readSync()
    },
  })
}
