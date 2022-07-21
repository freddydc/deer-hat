import '../styles/general.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <button>Look</button>
    <div id="content" class="grid"></div>
  </div>
`

const handleQuery = document.querySelector('button')
handleQuery.addEventListener('click', getUsers)

async function getUsers() {
  const limit = 3
  const response = await fetch(`/api/v1/users?limit=${limit}`)
  const users = await response.json()
  const { data } = users

  console.log(users)

  document.getElementById('content').innerHTML = `
    <img class="image" id="1" alt="Amazing photo">
    <img class="image" id="2" alt="Amazing photo">
    <img class="image" id="3" alt="Amazing photo">
  `

  const img1 = document.getElementById('1')
  const img2 = document.getElementById('2')
  const img3 = document.getElementById('3')

  img1.src = data[0].image
  img2.src = data[1].image
  img3.src = data[2].image
}
