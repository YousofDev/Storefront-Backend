import express from 'express'
import {
  productById,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/products'
import { requireLogin } from '../../controllers/users'

const products = express.Router()

products.param('id', productById)

products.get('/', getAllProducts)

products.get('/:id', getProduct)

products.use(requireLogin)

products.post('/', createProduct)

products.put('/:id', updateProduct)

products.delete('/:id', deleteProduct)

export default products
