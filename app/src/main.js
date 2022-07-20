import '../styles/general.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <button>Look</button>
  </div>
`

const handleQuery = document.querySelector('button')
handleQuery.addEventListener('click', getUsers)

function getUsers() {
  fetch('/api/v1/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
}
