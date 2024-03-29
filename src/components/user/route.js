import express from 'express'
import { generateToken, isAuth } from '../../auth.js'
import response from '../../response.js'
import controller from './controller.js'
import multer from 'multer'

export const user = express.Router()

const upload = multer({
  dest: `app/dist/static/`
})

user.get('/', async (req, res) => {
  const limit = req.query.limit
  try {
    const users = await controller.getUsers({
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

user.post('/login', async (req, res) => {
  try {
    const user = await controller.loginUser({
      username: req.body.username
    })

    if (user) {
      response.success({
        res,
        status: 200,
        data: {
          username: user.username,
          token: generateToken(user)
        }
      })
      return
    }

    response.success({
      res,
      message: 'Invalid Data',
      status: 401
    })
  } catch (e) {
    response.error({
      res,
      message: 'Internal Error',
      status: 500
    })
  }
})

user.put('/profile', isAuth, upload.single('file'), async (req, res) => {
  try {
    const user = await controller.updateProfile({
      username: req.body.username,
      file: req.file,
      id: req.user.id
    })

    if (user) {
      response.success({
        res,
        status: 200,
        data: {
          username: user.username,
          token: generateToken(user)
        }
      })
      return
    }

    response.success({
      res,
      message: 'User Not Found',
      status: 404
    })
  } catch (e) {
    console.log(e)
    response.error({
      res,
      message: 'Internal Error',
      status: 500
    })
  }
})

user.delete('/admin', isAuth, async (req, res) => {
  try {
    const user = await controller.removeUser(req.user.id)
    if (user) {
      response.success({
        res,
        status: 200,
        data: {
          username: user.username
        }
      })
      return
    }

    response.success({
      res,
      message: 'User not found',
      status: 404
    })
  } catch (e) {
    response.error({
      res,
      message: 'Internal Error',
      status: 500
    })
  }
})
