import User from '../models/user.js'

/**
 * @returns {Promise<object>}
 */

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    throw new Error('There are no users yet')
  }
  return users
}

/**
 *
 * @param {string} id
 * @returns {Promise<object>}
 */

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

/**
 *
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const removeUserById = async (id) => {
  await User.deleteOne({ _id: id })

  return true
}
