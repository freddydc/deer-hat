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

export default {
  getUsers,
  addUser
}
