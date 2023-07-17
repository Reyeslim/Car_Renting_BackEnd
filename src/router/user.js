import express from 'express'
import {
  getUsers,
  getUserById,
  removeUserById,
  togglePostFavByUser,
  createPostCommentByUser,
  deletePostCommentByUser,
} from '../controllers/user.js'

const router = express.Router()

router.get('/users', async (request, response) => {
  try {
    const users = await getUsers(request.user)
    response.json({ users })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

router.get('/users/:id', async (request, response) => {
  try {
    const user = await getUserById(request.params.id)
    response.json({ user })
  } catch (error) {
    if (error.message === 'User not found') {
      response.status(404).json(error.message)
    }
    response.status(500).json(error.message)
  }
})

router.delete('/users/:id', async (request, response) => {
  try {
    await removeUserById(request.params.id)
    response.json({ removed: true })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

// TODO a partir de aqui tengo que separar rutas

router.post('/users/toggle/favs/:postId', async (request, response) => {
  try {
    await togglePostFavByUser(request.params.postId, request.user)
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

router.post('/users/comment/:postId', async (request, response) => {
  try {
    await createPostCommentByUser({
      postId: request.params.postId,
      data: request.body,
      user: request.user,
    })

    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

router.delete('/users/comment/:commentId', async (request, response) => {
  try {
    await deletePostCommentByUser({
      commentId: request.params.commentId,
      user: request.user,
    })
    response.json(true)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

export default router
