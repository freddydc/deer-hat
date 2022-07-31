import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      unique: true
    },
    image: String
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User ?? mongoose.model('User', userSchema)

export default User
