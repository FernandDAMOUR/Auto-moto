import dotenv from 'dotenv'
dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 4000
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'
const SERVER_TOKEN_EXPIREDTIME = process.env.SERVER_TOKEN_EXPIREDTIME || '1h'
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'hahahah'
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'itssecret'

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'route'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'route'
const MONGO_HOSTNAME =
  process.env.MONGO_HOSTNAME || `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.w78cw5n.mongodb.net/API`

const MONGO = {
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  hostname: MONGO_HOSTNAME
}

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  url: SERVER_URL,
  token: {
    expiredTime: SERVER_TOKEN_EXPIREDTIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
    algorithm: 'HS256'
  }
}

const config = {
  mongo: MONGO,
  server: SERVER
}

export default config
