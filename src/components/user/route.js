import express from 'express'
import response from '../../response.js'
import controller from './controller.js'

export const user = express.Router()

user.get('/', (req, res) => {
  try {
    const users = controller.getUsers()
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
