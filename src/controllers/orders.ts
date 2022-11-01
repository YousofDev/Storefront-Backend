import { Order, OrderProduct } from '../models/order'
import { NextFunction, Request, Response } from 'express'
import RequestCustom from '../utils/custom-request'
import tryCatch from '../utils/try-cach'

export const orderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  orderId: number
) => {
  try {
    const order = await Order.findOne({ id: orderId })
    if (!order) {
      return res.status(404).send({ status: 404, message: 'There is no orders with that id!' })
    }
    const request = req as RequestCustom
    request.order = order
    next()
  } catch (error) {
    next(error)
  }
}

export const orderProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: number
) => {
  try {
    const orderProduct = await OrderProduct.findOne({ id })
    if (!orderProduct) {
      return res
        .status(404)
        .send({ status: 404, message: 'There is no orderProduct with that id!' })
    }
    const request = req as RequestCustom
    request.orderProduct = orderProduct
    next()
  } catch (error) {
    next(error)
  }
}

export const getOrder = tryCatch(async (req: Request, res: Response) => {
  const request = req as RequestCustom
  const { order } = request
  res.status(200).send({ status: 200, data: order })
})

export const getAllOrders = tryCatch(async (req: Request, res: Response) => {
  const orders = await Order.findAll()
  res.status(200).send({ status: 200, data: orders })
})

export const createOrder = tryCatch(async (req: Request, res: Response) => {
  let order = new Order(req.body)
  order = await order.save()
  res.status(201).send({ status: 201, data: order })
})

export const updateOrder = tryCatch(async (req: Request, res: Response) => {
  const request = req as RequestCustom
  let order = new Order({ ...request.order, ...req.body })
  order = await order.save()
  res.status(200).send({ status: 200, data: order })
})

export const deleteOrder = tryCatch(async (req: Request, res: Response) => {
  const request = req as RequestCustom
  let { order } = request
  order = await order.remove()
  res.status(204).send({ status: 204, data: order })
})

export const getAllOrderProducts = tryCatch(async (req: Request, res: Response) => {
  const orderProducts = await OrderProduct.findAll()
  res.status(200).send({ status: 200, data: orderProducts })
})

export const getOrderProductsByOrderId = tryCatch(async (req: Request, res: Response) => {
  const orderProducts = await OrderProduct.find({ orderId: req.params.orderId })
  res.status(200).send({ status: 200, data: orderProducts })
})

export const createOrderProduct = tryCatch(async (req: Request, res: Response) => {
  let orderProduct = new OrderProduct(req.body)
  orderProduct = await orderProduct.save()
  res.status(201).send({ status: 201, message: 'Order Product added', data: orderProduct })
})

export const updateOrderProduct = tryCatch(async (req: Request, res: Response) => {
  let orderProduct = new OrderProduct(req.body)
  orderProduct = await orderProduct.save()
  res.status(200).send({ status: 200, message: 'Order Product added', data: orderProduct })
})

export const getOrderProduct = tryCatch(async (req: Request, res: Response) => {
  const { orderId, productId } = req.params
  const orderProduct = await OrderProduct.findOne({ orderId, productId })
  res.status(200).send({ status: 200, data: orderProduct })
})

export const deleteOrderProduct = tryCatch(async (req: Request, res: Response) => {
  const { orderId, productId } = req.params
  let orderProduct = await OrderProduct.findOne({ orderId, productId })
  orderProduct = await orderProduct?.remove()
  res.status(204).send({ status: 204, message: 'Order Product deleted', data: orderProduct })
})
