import User from '../models/user.js'
import { getPostById } from './posts.js'
import UserPostComment from '../models/user_post_comment.js'

/**
 * @returns {Promise<object>}
 */

export const getUsers = async (user) => {
  if (!user || user.rol !== 'admin') {
    throw new Error('You dont have permission')
  }
  return User.find()
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

export const togglePostFavByUser = async (postId, user) => {
  if (!postId) {
    throw new Error('PostId is required')
  }
  const post = await getPostById(postId)
  const currentFavs = user.favPosts || []
  const existedFav = currentFavs.find(
    currentId.toString() === postId.toString()
  )

  let newFavList = []
  if (!existedFav) {
    newFavList = [...currentFavs, postId]
  } else {
    newFavList = currentFavs.filter(
      (currentId) => currentId.toString() !== postId.toString()
    )
  }

  await User.updateOne({ _id: user._id }, { favPosts: newFavList })
}

export const createPostCommentByUser = async ({ postId, data, user }) => {
  if (!data.comment) {
    throw new Error('Missing comment')
  }

  const post = await getPostById(postId)
  const postComment = new UserPostComment({
    postId,
    customerId: user._id,
    comment: data.comment,
  })

  await postComment.save()
}

/**
 *
 * @param {string} commentId
 * @param {object} user
 * @param {string} user._id
 * @param {'admin' | 'seller' | 'customer'} user.rol
 * @returns {Promise<boolean>}
 */

export const deletePostCommentByUser = async ({ commentId, user }) => {
  const comment = await UserPostComment.findOne({ _id: commentId })

  if (
    comment.customerId.toString() !== user._id.toString() &&
    user.rol !== 'admin'
  ) {
    throw new Error(
      'This comment can only be deleted by its author or the admin'
    )
  }

  await UserPostComment.deleteOne({
    _id: commentId,
    customerId: user._id,
  })

  return true
}
