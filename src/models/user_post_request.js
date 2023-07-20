import mongoose from 'mongoose'
import { PostAvailableTimeSchema } from './posts.js'

const UserPostRequestSchema = new mongoose.Schema(
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
    status: {
      type: String,
      require: true,
    },
    time: {
      type: [PostAvailableTimeSchema],
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
    },
  },
  { collection: 'userPostRequests' }
)

const UserPostRequest = mongoose.model('Request', UserPostRequestSchema)

export default UserPostRequest
