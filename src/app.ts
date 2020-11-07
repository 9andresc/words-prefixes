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

export default app
