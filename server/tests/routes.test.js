const request = require('supertest')
const app = require('../index.js')
describe('Post Endpoint', () => {
  it('should create a new card', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        name:'Peter',
        number: '4573294357026002',
        limit: 100
      })
    expect(res.statusCode).toEqual(200)
  })

  it('should create return 400 & "Card number is not valid"', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        name:'Peter',
        number: '4573294357026001',
        limit: 100
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({error:"Card number is not valid"})
  })

  it('should create return 400 & "Card number is required"', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        name:'Peter',
        limit: 100
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({error:"Card number is required"})
  })

  it('should create return 400 & "Name is required"', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        limit: 100,
        number: '4573294357026002'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({error:"Name is required"})
  })

  it('should create return 400 & "Card limit is required"', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        name:'Peter',
        number: '4573294357026002'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({error:"Card limit is required"})
  })
})