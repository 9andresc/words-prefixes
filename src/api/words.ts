import express, { NextFunction, Request, Response } from 'express'

import wordsService from 'services/words'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { prefix } = req.query

  let words
  try {
    words = await wordsService.getWords(String(prefix))
  } catch (error) {
    return next(error)
  }

  res.status(200)
  res.send({ words })
})

export default router
