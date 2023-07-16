import express from 'express'
import { getUsers, getUserById, removeUserById } from '../controllers/user.js'

const router = express.Router()

router.get('/users', async (request, response) => {
  try {
    const users = await getUsers()
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

// router.post('/users', async (request, response) => {
//   try {
//     const createdUser = await createUser(request.body)
//     response.json({ user: createdUser })
//   } catch (error) {
//     response.status(500).json(error.message)
//   }
// })

// router.put('/users/:id', async (request, response) => {
//   try {
//     const updatedUser = await updateUser(request.params.id, request.body)
//     response.json({ user: updatedUser })
//   } catch (error) {
//     response.status(500).json(error.message)
//   }
// })

export default router
