import store from './store.js'

function getUsers({ limit }) {
  return store.all({
    limit
  })
}

export default {
  getUsers
}
