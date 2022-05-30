import router from '../../server/router'

import initializeServer from './initializeServer'

const app = initializeServer(router)

app.listen(5000, () => console.log(`Listening on port ${5000}`)) // eslint-disable-line
