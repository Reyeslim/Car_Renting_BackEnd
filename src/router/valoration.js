import express from 'express'
import { createPostValorationByUser } from '../controllers/user.js'

const router = express.Router()

router.post('/:postId', async (request, response) => {
  try {
    await createPostValorationByUser({
      postId: request.params.postId,
      data: request.body,
      user: request.user,
    })

    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

export default router
