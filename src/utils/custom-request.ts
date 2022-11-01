import { Request } from 'express'
import { Order, OrderProduct } from '../models/order'
import { Product } from '../models/product'
import { User } from '../models/user'
export default interface RequestCustom extends Request {
  product: Product
  user: User
  order: Order
  orderProduct: OrderProduct
}
