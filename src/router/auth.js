import express from 'express'
import { login, signup } from '../controllers/auth.js'

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
 * /auth/login:
 *  post:
 *    summary: login of user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user logged
 */
router.post('/login', async (request, response) => {
  try {
    const token = await login(request.body)
    response.json(token)
  } catch (error) {
    response.status(500).json(error.message)
  }
})
/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: register a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user registered
 */
router.post('/signup', async (request, response) => {
  try {
    const token = await signup(request.body)
    response.json(token)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

export default router
