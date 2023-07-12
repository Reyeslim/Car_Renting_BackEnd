import mongoose from 'mongoose'

const PostValidationSchema = new mongoose.Schema(
  {
    customerId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    postId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' },
    },
    rate: {
      type: Number,
    },
  },
  { collection: 'validations' }
)

const PostValidation = mongoose.model('Validation', PostValidationSchema)

export default PostValidation
