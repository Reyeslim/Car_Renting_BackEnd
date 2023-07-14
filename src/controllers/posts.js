import Post from '../models/posts.js'

/**
 * @returns {Promise<object>}
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
 * @param {'car' | 'motorbike' | 'van'} data.vehicle
 * @param {string} data.brand
 * @param {string} data.name
 * @param {string} data.model
 * @param {number} data.plateNumber
 * @param {number} data.km
 * @param {number} data.carSeats
 * @param {'electric' | 'gas'} data.fuel
 * @param {'manual' | 'automatic'} data.gearBox
 * @param {number} data.doors
 * @param {string} data.sellerId
 */
export const createPost = async ({
  vehicle,
  name,
  brand,
  model,
  plateNumber,
  km,
  carSeats,
  fuel,
  gearBox,
  doors,
  sellerId,
}) => {
  if (
    !vehicle ||
    !brand ||
    !model ||
    !plateNumber ||
    !carSeats ||
    !km ||
    !name
  ) {
    throw new Error('Missing some fields')
  }

  const validPostType = ['car', 'van', 'motorbike']
  if (!validPostType.includes(vehicle)) {
    throw new Error(`The type of vehicle must be ${validPostType}`)
  }

  const validFuel = ['gas', 'electric']
  if (fuel && !validFuel.includes(fuel)) {
    throw new Error('This fuel type is not valid')
  }

  const validGearBox = ['manual', 'automatic']
  if (gearBox && !validGearBox.includes(gearBox)) {
    throw new Error('This gearbox type is invalid')
  }

  const validDoors = ['3', '5']
  if (doors && !validDoors.includes(doors)) {
    throw new Error('The number of doors is not valid')
  }

  // const existingPost = Post.findOne()
  // if (existingPost) {
  //   throw new Error('This post already exists')
  // }

  const post = new Post({
    vehicle,
    name,
    brand,
    model,
    plateNumber,
    km,
    carSeats,
    fuel,
    gearBox,
    doors,
    sellerId,
  })

  return post.save()
}

/**
 *
 * @param {string} id
 * @param {object} data
 * @param {'car' | 'motorbike' | 'van'} data.vehicle
 * @param {string} data.name
 * @param {string} data.brand
 * @param {string} data.model
 * @param {number} data.plateNumber
 * @param {number} data.km
 * @param {number} data.carSeats
 * @param {'electric' | 'gas'} data.fuel
 * @param {'manual' | 'automatic'} data.gearBox
 * @param {number} data.doors
 * @param {string} data.sellerId
 * @param {object} user
 * @param {'admin' | 'seller' | 'customer'} user.rol
 * @param {string} user._id
 */

export const updatePost = async (
  id,
  {
    vehicle,
    name,
    brand,
    model,
    plateNumber,
    km,
    carSeats,
    fuel,
    gearBox,
    doors,
    sellerId,
  },
  user
) => {
  const post = await getPostById(id)
  if (post.sellerId !== user._id && user.rol !== 'admin') {
    throw new Error('This post can only be edited by its author')
  }

  if (
    !vehicle ||
    !brand ||
    !model ||
    !plateNumber ||
    !carSeats ||
    !km ||
    !name
  ) {
    throw new Error('Missing some fields')
  }

  const validPostType = ['car', 'van', 'motorbike']
  if (!validPostType.includes(vehicle)) {
    throw new Error(`The type of vehicle must be ${validPostType}`)
  }

  const validFuel = ['gas', 'electric']
  if (fuel && !validFuel.includes(fuel)) {
    throw new Error('This fuel type is not valid')
  }

  const validGearBox = ['manual', 'automatic']
  if (gearBox && !validGearBox.includes(gearBox)) {
    throw new Error('This gearbox type is invalid')
  }

  const validDoors = ['3', '5']
  if (doors && !validDoors.includes(doors)) {
    throw new Error('The number of doors is not valid')
  }
  await Post.findOneAndUpdate(
    { _id: id },
    {
      vehicle,
      name,
      brand,
      model,
      plateNumber,
      km,
      carSeats,
      fuel,
      gearBox,
      doors,
      sellerId,
    }
  )

  return getPostById(id)
}

/**
 *
 * @param {string} id
 * @param {string} sellerId
 * @param {object} user
 * @param {string} user.rol
 * @param {string} user._id
 * @returns {boolean}
 */
export const removePostById = async (id) => {
  // const post = await getPostById(id)

  // if (post.sellerId !== user._id && user.rol !== 'admin') {
  //   throw new Error('This post can only be deleted by its author or the admin')
  // }

  await Post.deleteOne({ _id: id })

  return true
}
