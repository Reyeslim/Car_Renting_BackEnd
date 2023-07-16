import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { ensureAuthenticated } from './src/middelware/auth.js'
import authRouter from './src/router/auth.js'
import postsRouter from './src/router/posts.js'
import usersRouter from './src/router/user.js'
import connectToDb from './src/services/db.js'

dotenv.config()

const startApp = async () => {
  const app = express()
  const port = 8080

  app.use(cors())

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(ensureAuthenticated)
  app.use('/auth', authRouter)
  app.use('/posts', postsRouter)
  app.use('/admin', usersRouter)

  try {
    await connectToDb()
    app.listen(port, () => {
      console.log(`Server start in ${port} port`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startApp()
