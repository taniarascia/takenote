import server from './server'
import router from './router'

const app = server(router)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`) // eslint-disable-line
})
