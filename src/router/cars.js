import express from 'express'
import {
  createCar,
  getCarById,
  getCars,
  removeCarById,
  updateCar,
} from '../controllers/cars.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const cars = await getCars()
  response.json({ cars })
})

router.get('/:id', async (request, response) => {
  try {
    const car = await getCarById(request.params.id)
    response.json({ car })
  } catch (error) {
    if (error.message === 'Car not found') {
      response.status(404).json(error.message)
    }
    response.status(500).json(error.message)
  }
})

router.post('/', async (request, response) => {
  const createdCar = await createCar(request.body)
  response.json({ car: createdCar })
})

router.put('/:id', async (request, response) => {
  const updatedCar = await updateCar(request.params.id, request.body)
  response.json({ car: updatedCar })
})

router.delete('/:id', async (request, response) => {
  await removeCarById(request.params.id)
  response.json({ removed: true })
})

export default router
