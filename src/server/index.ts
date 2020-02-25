import initializeServer from './initializeServer'
import router from './router'

const app = initializeServer(router)

app.listen(5000, () => console.log(`Listening on port ${5000}`)) // eslint-disable-line
