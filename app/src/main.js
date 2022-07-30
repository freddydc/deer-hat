import '../styles/general.css'
import styles from '../styles/Home.module.css'

const PAGE_TITLE = 'Deer'
let inputValue = ''
let timeoutId = null
let userAuth = null

const app = document.querySelector('#app')

function render(child) {
  app.appendChild(child)
}

function message() {
  const card = document.createElement('div')
  const message = document.createElement('span')

  message.setAttribute('id', 'message')
  card.setAttribute('id', 'notifier-card')
  card.appendChild(message)

  render(card)
}

function toggleBrand(title) {
  const brand = document.querySelector('#brand-title')
  brand.textContent = title
}

function toggleAdmin() {
  const userForm = document.querySelector('#user-form')
  const adminForm = document.querySelector('#admin-form')

  userForm.classList.add(styles.toggleShow)
  adminForm.classList.remove(styles.toggleShow)
}

function toggleNotifier(message, variant) {
  const notifier = document.querySelector('#notifier-card')
  const span = document.querySelector('#message')

  const reset = () => {
    notifier.classList.remove(styles.notifier, styles.notifierError)
    span.textContent = ''
  }

  const cleanVariant = () => {
    notifier.classList.remove(styles.notifierError)
  }

  if (!message) {
    reset()
  }

  if (message) {
    cleanVariant()
    notifier.classList.add(styles.notifier)
    span.textContent = message

    if (variant) {
      notifier.classList.add(variant)
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      reset()
    }, 5000)
  }
}

function admin() {
  const adminForm = document.createElement('form')
  const labelUser = document.createElement('label')
  const entryData = document.createElement('input')
  const manageUser = document.createElement('button')

  adminForm.classList.add(styles.form, styles.toggleShow)
  labelUser.classList.add(styles.label)
  entryData.classList.add(styles.input)
  manageUser.classList.add(styles.button, styles.adminUser)

  labelUser.textContent = 'Profile'
  manageUser.textContent = 'Update'

  manageUser.setAttribute('type', 'submit')
  adminForm.setAttribute('id', 'admin-form')

  adminForm.appendChild(labelUser)
  adminForm.appendChild(entryData)
  adminForm.appendChild(manageUser)

  const handleInput = e => {
    inputValue = e.target.value
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  entryData.addEventListener('input', handleInput)
  manageUser.addEventListener('click', updateProfile)
  adminForm.addEventListener('submit', handleSubmit)

  return adminForm
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
  const userForm = document.createElement('form')
  const labelUser = document.createElement('label')
  const entryData = document.createElement('input')
  const createUser = document.createElement('button')
  const accessUser = document.createElement('button')
  const span = document.createElement('span')
  const adminForm = admin()

  navbar.classList.add(styles.navbar)
  brand.classList.add(styles.brand)
  userForm.classList.add(styles.form)
  labelUser.classList.add(styles.label)
  entryData.classList.add(styles.input)
  createUser.classList.add(styles.button, styles.signUp)
  accessUser.classList.add(styles.button, styles.signIn)
  span.classList.add(styles.span)

  brand.textContent = PAGE_TITLE
  labelUser.textContent = 'Username'
  createUser.textContent = 'Sign up'
  accessUser.textContent = 'Sign in'
  span.textContent = 'New user?'

  brand.setAttribute('id', 'brand-title')
  userForm.setAttribute('id', 'user-form')
  accessUser.setAttribute('type', 'submit')
  createUser.setAttribute('type', 'button')

  entryData.addEventListener('input', handleInput)
  userForm.addEventListener('submit', handleSubmit)
  createUser.addEventListener('click', addUser)
  accessUser.addEventListener('click', login)

  userForm.appendChild(labelUser)
  userForm.appendChild(entryData)
  userForm.appendChild(accessUser)
  userForm.appendChild(span)
  userForm.appendChild(createUser)

  navbar.appendChild(brand)
  navbar.appendChild(userForm)
  navbar.appendChild(adminForm)

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

  if (data) {
    userAuth = data.token
    toggleBrand(data.username)
    toggleNotifier()
    toggleAdmin()
  }

  if (error) {
    toggleNotifier(error, styles.notifierError)
  }
}

async function updateProfile() {
  const response = await fetch(`/api/v1/users/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userAuth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: inputValue
    })
  })

  const { error, data, message } = await response.json()

  if (data) {
    userAuth = data.token
    toggleBrand(data.username)
    toggleNotifier()
  }

  if (message) {
    toggleNotifier(message)
  }

  if (error) {
    toggleNotifier(error, styles.notifierError)
  }
}

async function login() {
  const response = await fetch(`/api/v1/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: inputValue
    })
  })

  const { data, message, error } = await response.json()

  if (data) {
    userAuth = data.token
    toggleBrand(data.username)
    toggleNotifier()
    toggleAdmin()
  }

  if (message) {
    toggleNotifier(message)
  }

  if (error) {
    toggleNotifier(error, styles.notifierError)
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
