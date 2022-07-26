import express from 'express'
import { generateToken } from '../../auth.js'
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

user.post('/signup', async (req, res) => {
  try {
    const user = await controller.addUser({
      username: req.body.username
    })

    response.success({
      res,
      status: 201,
      data: {
        username: user.username,
        token: generateToken(user)
      }
    })
  } catch (e) {
    console.log(e)

    response.error({
      status: 500,
      message: 'Internal Error',
      res
    })
  }
})
