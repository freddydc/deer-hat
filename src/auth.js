import jwt from 'jsonwebtoken'

export const generateToken = user => {
  const payload = {
    username: user.username
  }

  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '7d'
  })
}
