import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    doors: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { collection: 'cars' }
)

const Car = mongoose.model('Cars', CarSchema)

export default Car
