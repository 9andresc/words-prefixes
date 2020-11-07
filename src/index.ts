import { Application } from 'express'

import app from './app'

function listen(port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function startServer(): Promise<Application> {
  try {
    const port = process.env.PORT || 3000
    await listen(Number(port))
    console.log(`Server listening at 127.0.0.1:${port}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
  return app
}

process.on('uncaughtException', (error) => {
  console.error(error)
})
process.on('unhandledRejection', (error) => {
  console.error(error)
})

startServer()
