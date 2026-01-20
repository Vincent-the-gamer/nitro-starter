import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import dayjs from 'dayjs'
import { Logger } from 'tslog'

const logger = new Logger()

export default defineNitroPlugin((nitroApp) => {
  // nitroApp.hooks.hook('request', async (event) => {
  //   const { method } = event
  //   logger.info(`请求： method=${method}, path=${event.path}`)
  // })

  nitroApp.hooks.hook('beforeResponse', (event, { body }) => {
    const now = dayjs()

    const filterPaths = []

    if (!filterPaths.includes(event.path)) {
      const date = now.format('YYYY-MM-DD')
      const message = `Response：time=${now.format('YYYY-MM-DD HH:mm:ss')} method=${event.method} path=${event.path} body=${JSON.stringify(body)}`

      logger.info(message)

      let prefix = ''
      const folder = '/nitro-logs'
      const platform = os.platform()
      if (platform === 'win32') {
        prefix = 'C:/Users/Default'
      }
      else if (platform === 'darwin') {
        prefix = '/Users/Shared'
      }
      else {
        prefix = '/home/public'
      }

      const filepath = prefix + folder

      if (!fs.existsSync(prefix)) {
        fs.mkdirSync(prefix)
      }

      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath)
      }

      const logFilePath = path.resolve(filepath, `${date}.log`)
      fs.appendFileSync(logFilePath, `${message}\n`)
    }
  })

  // nitroApp.hooks.hook('afterResponse', (event, { body }) => {
  //   logger.info('响应后：', `method=${event.method} path=${event.path}`, { body })
  // })

  nitroApp.hooks.hook('error', async (error, { event }) => {
    logger.error(`${event.path} Error：`, error)
  })
})
