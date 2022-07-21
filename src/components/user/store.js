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

export default {
  all: getUsers
}
