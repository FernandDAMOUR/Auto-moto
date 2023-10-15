import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import logging from './logging'
import config from './config'
import cors from 'cors'
import http from 'http'
import userRoutes from './routes/user'
import formationRoutes from './routes/formation'
import seed from './seeders/user'
import commentRoutes from './routes/comment'
import appointmentRoutes from './routes/appointment'

const NAMESPACE = 'Server'
const app = express()

/** Connect to Mongo
 * @connect to reach the connection
 * @then to check if the connection is done
 * @catch to check if the connection is failed
 */
mongoose
  .connect(config.mongo.hostname)
  .then((result) => {
    logging.info(NAMESPACE, 'Mongo Connected')
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

/** Log the request
 * @param req to get the request
 * @param res to get the response
 * @param next to go to the next middleware
 * @return the request and the response
 */
app.use((req, res, next) => {
  /** Log the req
   * @param NAMESPACE to get the namespace
   * @param METHOD to get the method
   * @param URL to get the url
   * @param STATUS to get the status
   * @param IP to get the ip
   */
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    /** Log the res
     * @param NAMESPACE to get the namespace
     * @param METHOD to get the method
     * @param URL to get the url
     * @param STATUS to get the status
     * @param IP to get the ip
     */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    )
  })

  next()
})

app.use(express.json())
app.use(cors())

/** Parse the body of the request
 * @param req to get the request
 * @param res to get the response
 * @param next to go to the next middleware
 * @return the request and the response
 * @body-parser to parse the body of the request
 * @urlencoded to parse the url
 * @extended to parse the extended
 * @json to parse the json
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// /** Rules of our API */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }

//   next()
// })

/** Routes go here
 * @param /user to get the user
 * @param userRoutes to get the userRoutes
 * @param /formation to get the formation
 * @param formationRoutes to get the formationRoutes
 * @param /seed to get the seed
 */

app.use('/users', userRoutes)
app.use('/formations', formationRoutes)
app.use('/comment', commentRoutes)
app.use('/appointment', appointmentRoutes)
app.post('/users', seed)

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found')

  res.status(404).json({
    message: error.message
  })
})

// app.listen(config.server.port,() =>
// logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`))

const httpServer = http.createServer(app)

httpServer.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
)
