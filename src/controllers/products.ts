import { Product } from '../models/product'
import { NextFunction, Request, Response } from 'express'
import RequestCustom from '../utils/custom-request'
import tryCatch from '../utils/try-cach'

export const productById = async (req: Request, res: Response, next: NextFunction, id: number) => {
  try {
    const product = await Product.findOne({ id })
    if (!product)
      return res.status(404).send({ status: 404, message: 'There is no products with that id' })
    const request = req as RequestCustom
    request.product = product
    next()
  } catch (error) {
    next(error)
  }
}

export const getProduct = (req: Request, res: Response) => {
  const request = req as RequestCustom
  const product = request.product
  res.send({ status: 200, data: product })
}

export const getAllProducts = tryCatch(async (req: Request, res: Response) => {
  const products = await Product.findAll()
  res.status(200).send({ status: 200, results: products.length, data: products })
})

export const createProduct = tryCatch(async (req: Request, res: Response) => {
  let product = new Product(req.body)
  product = await product.save()
  res.status(201).send({ status: 201, data: product })
})

export const updateProduct = tryCatch(async (req: Request, res: Response) => {
  const request = req as RequestCustom
  let product = new Product({ ...request.product, ...req.body })
  product = await product.save()
  res.status(200).send({ status: 200, data: product })
})

export const deleteProduct = tryCatch(async (req: Request, res: Response) => {
  const request = req as RequestCustom
  let { product } = request
  product = await product.remove()
  res.status(204).send({ status: 204, message: 'Product deleted Successfully', data: product })
})
