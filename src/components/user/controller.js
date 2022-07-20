import store from './store.js'

function getUsers() {
  return store.all()
}

export default {
  getUsers
}
