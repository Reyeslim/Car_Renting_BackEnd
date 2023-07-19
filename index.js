import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { ensureAuthenticated } from './src/middleware/auth.js'
import authRouter from './src/router/auth.js'
import userRouter from './src/router/user.js'
import postsRouter from './src/router/posts.js'
import adminRouter from './src/router/admin.js'
import commentsRouter from './src/router/comments.js'
import favsRouter from './src/router/favs.js'
import valorationRouter from './src/router/valoration.js'
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
  app.use('/admin', adminRouter)
  app.use('/user', userRouter)
  app.use('/comment', commentsRouter)
  app.use('/valoration', valorationRouter)
  app.use('/toggle', favsRouter)

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
