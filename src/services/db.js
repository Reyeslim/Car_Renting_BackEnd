import mongoose from 'mongoose'

export const connectToDb = async () => {
  console.log('Starting DB connection...')
  await mongoose.connect('mongodb://localhost:27017/reyesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connected to DB reyesdb')
}

export default connectToDb
