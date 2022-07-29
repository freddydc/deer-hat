import response from './response.js'
import jwt from 'jsonwebtoken'

export const generateToken = user => {
  const payload = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '7d'
  })
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization) {
    try {
      const token = authorization.slice(7, authorization.length) // Bearer ---
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      req.user = decoded
      next()
    } catch (e) {
      response.error({
        status: 401,
        message: 'Invalid Auth',
        res
      })
    }
    return
  }

  response.error({
    res,
    message: 'Not Auth',
    status: 401
  })
}
