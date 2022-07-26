import '../styles/general.css'
import styles from '../styles/Home.module.css'

let state = {
  title: 'Deer',
  inputValue: ''
}

const app = document.querySelector('#app')

function header() {
  const { title } = state

  const handleInput = e => {
    state = {
      ...state,
      inputValue: e.target.value
    }
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

  brand.textContent = title
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

  app.appendChild(navbar)
}

async function content() {
  const { data } = await users({
    limit: 10
  })

  const grid = document.createElement('div')

  grid.classList.add(styles.grid)

  data.forEach(({ image }) => {
    const photo = document.createElement('img')
    photo.classList.add(styles.image)
    photo.setAttribute('src', image)
    grid.appendChild(photo)
  })

  app.appendChild(grid)
}

async function users({ limit }) {
  const response = await fetch(`/api/v1/users?limit=${limit}`)
  const users = await response.json()
  return users
}

async function addUser() {
  const { inputValue } = state

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

  const user = await response.json()

  console.log(user)
}

!(function () {
  header()
  content()
})()
