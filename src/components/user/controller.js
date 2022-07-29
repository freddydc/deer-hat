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

function updateProfile(data) {
  return store.updateProfile(data)
}

export default {
  getUsers,
  addUser,
  updateProfile
}
