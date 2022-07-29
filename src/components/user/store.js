import User from './model.js'

let storage = [
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg'
  }
]

function getUsers({ limit }) {
  const users = storage.slice(
    0,
    !Number(limit) ? storage.length : Number(limit)
  )
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
    const updatedUser = await user.save()
    return updatedUser
  }
}

export default {
  all: getUsers,
  add: addUser,
  updateProfile
}
