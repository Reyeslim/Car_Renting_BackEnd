import Post from '../models/posts.js'

/**
 * @returns {[]} Post
 */

export const getPosts = async () => {
  return Post.find()
}

/**
 *
 * @param {string} id
 * @returns Post
 */

export const getPostById = async (id) => {
  const post = await Post.findOne({ _id: id })

  if (!post) {
    throw new Error('Post not found')
  }

  return post
}

/**
 *
 * @param {object} data
 * @param {string} data.vehicle
 * @param {string} data.brand
 * @param {string} data.model
 * @param {number} data.plateNumber
 * @param {number} data.km
 * @param {number} data.carSeats
 * @param {string} data.fuel
 * @param {string} data.gearBox
 * @param {number} data.doors
 * @param {number} data.price
 * @param {string} data.sellerId
 */
export const createPost = async (data) => {
  const post = new Post(data)

  return post.save()
}

/**
 *
 * @param {string} id
 * @param {object} data
 */

export const updatePost = async (id, data, user) => {
  const post = await getPostById(id)
  if (post.sellerId !== user._id && user.rol !== 'admin') {
    throw new Error('This post can be edited only by its author')
  }
  await Post.findOneAndUpdate({ _id: id }, data)

  return getPostById(id)
}

/**
 *
 * @param {string} id
 * @returns {boolean}
 */
export const removePostById = async (id) => {
  await Post.deleteOne({ _id: id })

  return true
}
