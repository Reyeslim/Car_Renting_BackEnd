import mongoose from 'mongoose'

const UserCommentsSchema = new mongoose.Schema(
  {
    customerId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    postId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' },
    },
    comment: {
      type: String,
    },
  },
  { collection: 'userComments' }
)

const Comment = mongoose.model('Comments', UserCommentsSchema)

export default Comment
