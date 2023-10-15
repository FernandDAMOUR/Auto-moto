/**
 * Info logging to catch the info
 * @param namespace for the namespace
 * @param message for the message
 * @param object to get the object
 */
const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object)
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
  }
}

/**
 * Error logging to catch the error
 * @param namespace
 * @param message
 * @param object
 */
const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object)
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`)
  }
}

/**
 *To get the timestamp
 *
 */
const getTimeStamp = (): string => {
  return new Date().toISOString()
}

export default { info, error }
