import { Application } from 'express'
import request from 'supertest'

import startServer from '../../server'

let app: Application
beforeAll(async () => {
  app = await startServer()
})

describe('worlds api', () => {
  it('should get filtered words', async () => {
    const response = await request(app).get('/words').query({ prefix: 'abacu' })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ words: ['abaculi', 'abaculus', 'abacus', 'abacuses'] })
  })

  it('should not get words', async () => {
    const response = await request(app).get('/words').query({ prefix: 'qcdPYv184L' })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ words: [] })
  })
})
