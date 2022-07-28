import '../styles/general.css'
import styles from '../styles/Home.module.css'

const PAGE_TITLE = 'Deer'
let inputValue = ''
let timeoutId = null

const app = document.querySelector('#app')

function render(child) {
  app.appendChild(child)
}

function message() {
  const card = document.createElement('div')
  const message = document.createElement('span')

  card.classList.add(styles.messageCard)
  message.setAttribute('id', 'message')
  card.appendChild(message)

  render(card)
}

function navbar() {
  const handleInput = e => {
    inputValue = e.target.value
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const navbar = document.createElement('header')
  const brand = document.createElement('h1')
  const formContent = document.createElement('form')
  const labelUser = document.createElement('label')
  const entryData = document.createElement('input')
  const menu = document.createElement('div')
  const createUser = document.createElement('button')

  navbar.classList.add(styles.navbar)
  brand.classList.add(styles.brand)
  formContent.classList.add(styles.form)
  labelUser.classList.add(styles.label)
  entryData.classList.add(styles.input)
  menu.classList.add(styles.box)
  createUser.classList.add(styles.button)

  brand.textContent = PAGE_TITLE
  labelUser.textContent = 'Username'
  createUser.textContent = 'Sign up'
  createUser.setAttribute('type', 'submit')

  entryData.addEventListener('input', handleInput)
  formContent.addEventListener('submit', handleSubmit)
  createUser.addEventListener('click', addUser)

  menu.appendChild(createUser)

  formContent.appendChild(labelUser)
  formContent.appendChild(entryData)
  formContent.appendChild(menu)

  navbar.appendChild(brand)
  navbar.appendChild(formContent)

  render(navbar)
}

function users({ data }) {
  const grid = document.createElement('div')

  grid.classList.add(styles.grid)

  data.forEach(({ image }) => {
    const photo = document.createElement('img')
    photo.classList.add(styles.image)
    photo.setAttribute('src', image)
    grid.appendChild(photo)
  })

  render(grid)
}

async function getUsers({ limit }) {
  const response = await fetch(`/api/v1/users?limit=${limit}`)
  const users = await response.json()
  return users
}

async function addUser() {
  const newUser = {
    username: inputValue
  }

  const response = await fetch(`/api/v1/users/signup`, {
    method: 'POST',
    headers: {
      Authorization: 'Our custom value',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })

  const { error, data } = await response.json()

  console.log(data)

  if (error) {
    const message = document.querySelector('#message')
    message.classList.add(styles.messageText)
    message.textContent = error

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      message.classList.value = ''
      message.textContent = ''
    }, 5000)
  }
}

!(async function () {
  const allUsers = await getUsers({
    limit: 10
  })

  navbar()
  users(allUsers)
  message()
})()
