import express from 'express'
import users from './api/users'
import products from './api/products'
import orders from './api/orders'

const routes = express.Router()

routes.use('/users', users)

routes.use('/products', products)

routes.use('/orders', orders)

export default routes
