import express from 'express'
import response from '../../response.js'
import controller from './controller.js'

export const user = express.Router()

user.get('/', (req, res) => {
  const limit = req.query.limit ?? null
  try {
    const users = controller.getUsers({
      limit
    })
    response.success({
      data: users,
      res
    })
  } catch (err) {
    response.error({
      message: 'Internal Error',
      res
    })
  }
})

user.post('/signup', (req, res) => {
  const username = req.body.username

  console.log(req.headers)

  res.header({
    'Custom-Header': 'Our custom value'
  })

  response.success({
    res,
    data: username
  })
})
