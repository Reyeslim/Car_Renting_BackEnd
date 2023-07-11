import User from '../models/user.js'

/**
 * @returns {[]} User
 */

export const getUsers = async () => {
  return User.find()
}

/**
 *
 * @param {string} id
 * @returns {{email: string, password: string, name: string, salt: string, carsFavs: [string]}}
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
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.name
 * @param {string} data.salt
 * @param {[string]} data.carsFavs
 */
export const createUser = async (data) => {
  const user = new User(data)

  return user.save()
}

/**
 *
 * @param {string} id
 * @param {object} data
 */

export const updateUser = async (id, data) => {
  await User.findOneAndUpdate({ _id: id }, data)

  return getUserById(id)
}

/**
 *
 * @param {string} id
 * @returns {boolean}
 */
export const removeUserById = async (id) => {
  await User.deleteOne({ _id: id })

  return true
}
