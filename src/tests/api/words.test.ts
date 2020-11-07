import request from 'supertest'

import app from '../../app'

describe('worlds api', () => {
  it('should get filtered words', async () => {
    const response = await request(app).get('/words').query({ prefix: 'abacu' })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ words: ['abaculi', 'abaculus', 'abacus', 'abacuses'] })

    return
  })

  it('should not get words', async () => {
    const response = await request(app).get('/words').query({ prefix: 'qcdPYv184L' })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ words: [] })

    return
  })
})
