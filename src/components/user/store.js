import User from './model.js'

async function getUsers({ limit }) {
  const users = await User.find({}).limit(limit)
  return users
}

async function addUser(data) {
  const newUser = new User({
    username: data.username
  })
  const user = await newUser.save()
  return user
}

async function updateProfile(data) {
  const user = await User.findById(data.id)

  if (user) {
    user.username = data.username || user.username
    user.image = data.image
    const updatedUser = await user.save()
    return updatedUser
  }
}

async function loginUser(data) {
  const user = await User.findOne({
    username: data.username
  })

  return user
}

async function removeUser(id) {
  const user = await User.findById(id)

  if (user) {
    const deletedUser = await user.remove()
    return deletedUser
  }
}

export default {
  all: getUsers,
  add: addUser,
  updateProfile,
  loginUser,
  remove: removeUser
}
