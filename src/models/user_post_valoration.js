import mongoose from 'mongoose'

const UserPostValorationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
    rate: {
      type: Number,
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: 'userPostValorations' }
)

const UserPostValoration = mongoose.model(
  'Valoration',
  UserPostValorationSchema
)

export default UserPostValoration
