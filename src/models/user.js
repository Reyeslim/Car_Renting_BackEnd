import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    name: {
      type: String,
    },

    salt: {
      type: String,
      require: true,
    },
    carsFavs: [
      {
        type: String,
      },
    ],
  },
  { collection: 'users' }
)

const User = mongoose.model('User', UserSchema)

export default User
