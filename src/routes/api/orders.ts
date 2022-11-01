import express from 'express'
import {
  getAllOrders,
  getAllOrderProducts,
  orderById,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
  getOrderProductsByOrderId,
  createOrderProduct
} from '../../controllers/orders'
import { requireLogin } from '../../controllers/users'

const orders = express.Router()

orders.param('orderId', orderById)

orders.use(requireLogin)

orders.get('/', getAllOrders)

orders.post('/', createOrder)

orders.get('/:orderId', getOrder)

orders.put('/:orderId', updateOrder)

orders.delete('/:orderId', deleteOrder)

orders.get('/order-products', getAllOrderProducts)

orders.post('/order-products', createOrderProduct)

orders.get('/order-products/:orderId/', getOrderProductsByOrderId)

orders.get('/order-products/:orderId/:productId', getOrderProduct)

orders.put('/order-products/:orderId/:productId', updateOrderProduct)

orders.delete('/order-products/:orderId/:productId', deleteOrderProduct)

export default orders
