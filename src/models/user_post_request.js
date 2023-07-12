import mongoose from 'mongoose'

const PostRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    postId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' },
    },
    status: {
      type: String,
    },
  },
  { collection: 'requests' }
)

const PostRequest = mongoose.model('Requests', PostRequestSchema)

export default PostRequest
