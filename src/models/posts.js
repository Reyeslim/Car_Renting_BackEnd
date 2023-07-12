import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    vehicle: {
      type: String,
    },
    brand: {
      type: String,
      require: true,
    },
    model: {
      type: String,
    },
    plateNumber: {
      type: Number,
    },
    km: {
      type: Number,
    },
    carSeats: {
      type: Number,
    },
    fuel: {
      type: String,
    },
    gearBox: {
      type: String,
    },
    doors: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    sellerId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  { collection: 'posts' }
)

const Post = mongoose.model('Posts', PostSchema)

export default Post
