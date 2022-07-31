import store from './store.js'

function getUsers({ limit }) {
  return store.all({
    limit
  })
}

function addUser(data) {
  if (!data.username) {
    return Promise.reject('Invalid username')
  }

  return store.add({
    username: data.username
  })
}

function updateProfile({ file, username, id }) {
  const image = file ? `/static/${file.filename}` : ''
  return store.updateProfile({
    image,
    username,
    id
  })
}

function loginUser(data) {
  return store.loginUser(data)
}

export default {
  getUsers,
  addUser,
  updateProfile,
  loginUser
}
