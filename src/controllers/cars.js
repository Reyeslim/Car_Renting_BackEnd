import Car from '../models/cars.js'

/**
 * @returns {[]} Car
 */

export const getCars = async () => {
  return Car.find()
}

/**
 *
 * @param {string} id
 * @returns {{brand: string, doors: number, price: number}}
 */

export const getCarById = async (id) => {
  const car = await Car.findOne({ _id: id })

  if (!car) {
    throw new Error('Car not found')
  }

  return car
}

/**
 *
 * @param {object} data
 * @param {string} data.brand
 * @param {number} data.doors
 * @param {number} data.price
 */
export const createCar = async (data) => {
  const car = new Car(data)

  return car.save()
}

/**
 *
 * @param {string} id
 * @param {object} data
 */

export const updateCar = async (id, data) => {
  await Car.findOneAndUpdate({ _id: id }, data)

  return getCarById(id)
}

/**
 *
 * @param {string} id
 * @returns {boolean}
 */
export const removeCarById = async (id) => {
  await Car.deleteOne({ _id: id })

  return true
}
