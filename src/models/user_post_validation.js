import mongoose from 'mongoose'

const UserPostValidationSchema = new mongoose.Schema(
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
  { collection: 'userPostValidations' }
)

const UserPostValidation = mongoose.model(
  'Validation',
  UserPostValidationSchema
)

export default UserPostValidation
