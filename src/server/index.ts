import initializeServer from './initializeServer'
import router from './router'

const app = initializeServer(router)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`) // eslint-disable-line
})
