import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import wordsApi from 'api/words'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/words', wordsApi)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error)
  res.status(500)
  res.send({ message: 'Internal server error.' })
})

function listen(port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function startServer() {
  try {
    const port = process.env.PORT || 3000
    await listen(Number(port))
    console.log(`Server listening at 127.0.0.1:${port}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

process.on('uncaughtException', (error) => {
  console.error(error)
})
process.on('unhandledRejection', (error) => {
  console.error(error)
})

startServer()
