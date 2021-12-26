import * as dotenv from 'dotenv'

import initializeServer from './initializeServer'
import router from './router'

dotenv.config()

const app = initializeServer(router)
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line
