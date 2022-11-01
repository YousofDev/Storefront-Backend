import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

let token: string

describe('Test Home Endpoint', () => {
  it('should return ok status', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

//////////////////////////////////////////////////////// User Endpoints ////////////////////////////////////////
describe('Test User Endpoints', () => {
  it('should create user', async () => {
    const response1 = await request
      .post('/api/v1/users/')
      .send({
        firstName: 'Ramy',
        lastName: 'Ahmed',
        email: 'ramy@mail.com',
        password: '123456'
      })
      .set('Accept', 'application/json')
    expect(response1.status).toBe(201)

    const response2 = await request
      .post('/api/v1/users/')
      .send({
        firstName: 'Saber',
        lastName: 'Khalid',
        email: 'saber@mail.com',
        password: '123456'
      })
      .set('Accept', 'application/json')
    expect(response2.status).toBe(201)
  })

  it('should login user', async () => {
    const response = await request
      .post('/api/v1/users/me/login')
      .send({ email: 'ramy@mail.com', password: '123456' })
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    token = `Token ${response.body.accessToken}`
  })

  it('should get all users', async () => {
    const response = await request
      .get('/api/v1/users/')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should get one user', async () => {
    const response = await request
      .get('/api/v1/users/1')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should update user', async () => {
    const response = await request
      .put('/api/v1/users/1')
      .send({ lastName: 'Ali' })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should delete one user', async () => {
    const response = await request
      .delete('/api/v1/users/2')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(204)
  })
})

//////////////////////////////////////////////////////// Product Endpoints /////////////////////////////////////

describe('Test Product Endpoints', () => {
  it('should create product', async () => {
    const response1 = await request
      .post('/api/v1/products/')
      .send({ name: 'Tomato', price: 10 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response1.status).toBe(201)

    const response2 = await request
      .post('/api/v1/products/')
      .send({ name: 'Fish', price: 20 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response2.status).toBe(201)
  })

  it('should get all products', async () => {
    const response = await request.get('/api/v1/products/').set({ Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should get one product', async () => {
    const response = await request.get('/api/v1/products/1').set({ Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should update product', async () => {
    const response = await request
      .put('/api/v1/products/1')
      .send({ name: 'Orange', price: 50 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.body.data.name).toBe('Orange')
  })

  it('should delete one product', async () => {
    const response = await request
      .delete('/api/v1/products/2')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(204)
  })
})

//////////////////////////////////////////////////////// Order Endpoints ///////////////////////////////////////
describe('Test Order Endpoints', () => {
  it('should create order', async () => {
    const response1 = await request
      .post('/api/v1/orders/')
      .send({ userId: 1 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response1.status).toBe(201)

    const response2 = await request
      .post('/api/v1/orders/')
      .send({ userId: 1 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response2.status).toBe(201)
  })

  it('should get all orders', async () => {
    const response = await request
      .get('/api/v1/orders/')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should get one order', async () => {
    const response = await request
      .get('/api/v1/orders/1')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should update an order', async () => {
    const response = await request
      .put('/api/v1/orders/1')
      .send({ status: 'Delivered' })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.body.data.status).toBe('Delivered')
  })

  it('should delete one order', async () => {
    const response = await request
      .delete('/api/v1/orders/2')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(204)
  })
})

////////////////////////////////////////////////////// OrderProduct Endpoints ////////////////////////////////

describe('Test OrderProduct Endpoints', () => {
  it('should create order product', async () => {
    const response = await request
      .post('/api/v1/orders/order-products/')
      .send({ orderId: 1, productId: 1, quantity: 10 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(201)
  })

  it('should get one order product', async () => {
    const response = await request
      .get('/api/v1/orders/order-products/1/1')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  it('should update an order product', async () => {
    const response = await request
      .put('/api/v1/orders/order-products/1/1')
      .send({ id: 1, orderId: 1, productId: 1, quantity: 15 })
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.body.data.quantity).toBe(15)
  })

  it('should delete one order product', async () => {
    const response = await request
      .delete('/api/v1/orders/order-products/1/1')
      .set({ Authorization: token, Accept: 'application/json' })
    expect(response.status).toBe(204)
  })
})

describe('Test Logout', () => {
  it('should return ok status', async () => {
    const response = await request.post('/api/v1/users/me/logout')
    expect(response.status).toBe(200)
  })
})
