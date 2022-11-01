import Repository from '../database/repository'
const orderRepo = Repository.table('orders')
const orderProductRepo = Repository.table('order_products')

export interface OrderBase {
  id?: number
  userId?: number
  status?: string
}

export interface OrderProductBase {
  id?: number
  orderId: number
  productId: number
  quantity: number
}

export class Order {
  id?: number
  userId?: number
  status?: string

  constructor(data: OrderBase) {
    this.id = data.id
    this.userId = data.userId
    this.status = data.status
  }

  async save() {
    const order: OrderBase = { userId: this.userId, status: this.status }
    if (!this.id) {
      return await orderRepo.insert(order)
    }
    return await orderRepo.update(this.id, order)
  }

  async remove() {
    if (this.id) {
      return await orderRepo.delete(this.id)
    }
  }

  static async findAll(): Promise<Order[]> {
    return await orderRepo.find({})
  }

  static async findOne<T>(where: T): Promise<Order | null> {
    const orders = await orderRepo.find(where)
    return orders[0] ? new Order(orders[0]) : null
  }

  static async updateOne(id: number, order: OrderBase): Promise<Order> {
    return await orderRepo.update(id, order)
  }

  static async deleteOne(id: number): Promise<Order> {
    return await orderRepo.delete(id)
  }
}

export class OrderProduct {
  id?: number
  orderId: number
  productId: number
  quantity: number

  constructor(data: OrderProductBase) {
    this.id = data.id
    this.orderId = data.orderId
    this.productId = data.productId
    this.quantity = data.quantity
  }

  async save() {
    const orderProduct: OrderProductBase = {
      orderId: this.orderId,
      productId: this.productId,
      quantity: this.quantity
    }

    if (!this.id) {
      return await orderProductRepo.insert(orderProduct)
    }
    return await orderProductRepo.update(this.id, orderProduct)
  }

  async remove() {
    if (this.id) {
      return await orderProductRepo.delete(this.id)
    }
  }

  static async find<T>(where: T): Promise<OrderProduct[]> {
    return await orderProductRepo.find(where)
  }

  static async findAll(): Promise<OrderProduct[]> {
    return await orderProductRepo.find({})
  }

  static async findOne<T>(where: T): Promise<OrderProduct | null> {
    const orderProducts = await orderProductRepo.find(where)
    return orderProducts[0] ? new OrderProduct(orderProducts[0]) : null
  }

  static async updateOne(id: number, orderProduct: OrderProductBase): Promise<OrderProduct> {
    return await orderProductRepo.update(id, orderProduct)
  }

  static async deleteOne(id: number): Promise<OrderProduct> {
    return await orderProductRepo.delete(id)
  }
}
