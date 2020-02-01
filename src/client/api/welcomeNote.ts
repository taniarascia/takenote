import uuid from 'uuid/v4'
import moment from 'moment'

const markdown = require('./note.md')

export const welcomeNote = fetch(markdown)
  .then(res => res.text())
  .then(text => {
    const welcomeNote = [
      {
        id: uuid(),
        text,
        category: '',
        favorite: false,
        created: moment().format(),
      },
    ]
    return welcomeNote
  })
