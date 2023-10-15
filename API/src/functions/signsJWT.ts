import jwt from 'jsonwebtoken'
import config from '../config'

const signJWT = (user: any, callback: any) => {
  const timeSinceEpoch = new Date().getTime()
  const expirationTime = timeSinceEpoch + 1000 * 60 * 60
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000)

  const payload = {
    email: user.email,
    name: user.name,
    _id: user._id,
    iat: timeSinceEpoch,
    exp: expirationTimeInSeconds
  }

  const secret = config.server.token.secret

  jwt.sign(payload, secret, (error, token) => {
    if (error) {
      callback(error, null)
    } else if (token) {
      callback(null, token)
    }
  })
}

export default signJWT
