let storage = [
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
  }
]

function getUsers() {
  return storage
}

export default {
  all: getUsers
}
