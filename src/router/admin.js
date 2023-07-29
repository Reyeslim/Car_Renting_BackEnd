import express from 'express'
import { getUsers, removeUserById } from '../controllers/user.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the user email
 *        age:
 *          type: integer
 *          description: birth date of user
 *        password:
 *          type: string
 *          description: the user password
 *        firstName:
 *          type: string
 *          description: the user first name
 *        lastName:
 *          type: string
 *          description: the user last name
 *        phone:
 *          type: number
 *          description: the user phone number
 *        dni:
 *          type: string
 *          description: the user dni
 *        rol:
 *          type: string
 *          description: the user role
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: test@test.com
 *        age: 25
 *        password: test
 *        firstName: Test
 *        lastName: Tester
 *        phone: 695412369
 *        dni: 86423971F
 *        rol: customer
 *
 */

/**
 * @swagger
 * /admin/users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 */
router.get('/users', async (request, response) => {
  try {
    const users = await getUsers(request.user)
    response.json({ users })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

/**
 * @swagger
 * /admin/users/{id}:
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: user deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 */

router.delete('/users/:id', async (request, response) => {
  try {
    await removeUserById(request.params.id)
    response.json({ removed: true })
  } catch (error) {
    response.status(500).json(error.message)
  }
})

export default router
