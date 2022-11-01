import { Order, OrderProduct } from '../models/order'
import { Product } from '../models/product'
import { User, UserBase } from '../models/user'

//////////////////////////////////////////////////////// User Model /////////////////////////////////////////
// Note: we have created some users in endpoints test

describe('Testing User Model', () => {
  it('should create user', async () => {
    let user = new User({
      firstName: 'Osama',
      lastName: 'Yaser',
      email: 'osama@mail.com',
      password: '123456'
    })
    await user.save()

    expect(user.lastName).toBe('Yaser')
  })

  it('should get user', async () => {
    let user = await User.findOne({ firstName: 'Osama' })
    expect(user?.id).toBe(3)
  })

  it('should update user email', async () => {
    let user: UserBase = {
      firstName: 'Morad',
      lastName: 'Tamer',
      email: 'moradtamer@mail.com'
    }
    user = await User.updateOne(3, user)
    expect(user.email).toBe('moradtamer@mail.com')
  })

  it('should get all users', async () => {
    let users = await User.findAll()
    expect(users.length).toBe(2)
  })

  it('should delete user', async () => {
    await User.deleteOne(3)
    let users = await User.findAll()
    expect(users.length).toBe(1)
  })
})

//////////////////////////////////////////////////////// Product Model /////////////////////////////////////

// Note: we have created some products in endpoints test

describe('Testing Product Model', () => {
  it('should create product', async () => {
    let product1 = new Product({ name: 'Apple', price: 50 })
    let product2 = new Product({ name: 'Cheese', price: 60 })
    product1 = await product1.save()
    product2 = await product2.save()
    expect(product1.price).toBe(50)
    expect(product2.price).toBe(60)
  })

  it('should get all product', async () => {
    let products = await Product.findAll()
    expect(products.length).toBe(3)
  })

  it('should get product', async () => {
    let product = await Product.findOne({ name: 'Cheese' })
    expect(product?.id).toBe(4)
  })

  it('should update product name', async () => {
    await Product.updateOne(3, { name: 'Peach', price: 30 })
    let product = await Product.findOne({ id: 3 })
    expect(product?.name).toBe('Peach')
  })

  it('should delete product', async () => {
    let product = await Product.findOne({ id: 4 })
    await product?.remove()
    const products = await Product.findAll()
    expect(products.length).toBe(2)
  })
})

//////////////////////////////////////////////////////// Order Model /////////////////////////////////////
// Note: we have created some orders in endpoints test

describe('Testing Order Model', () => {
  it('should create order', async () => {
    let order = new Order({ userId: 1 })
    order = await order.save()
    expect(order.id).toBe(3)
  })

  it('should update order status', async () => {
    let order = await Order.updateOne(3, { status: 'Delivered' })
    expect(order.status).toBe('Delivered')
  })

  it('should get an order', async () => {
    let order = await Order.findOne({ id: 3 })
    expect(order?.userId).toBe(1)
  })

  it('should get All orders', async () => {
    let orders = await Order.findAll()
    expect(orders.length).toBe(2)
  })

  it('should delete order', async () => {
    await Order.deleteOne(3)
    const orders = await Order.findAll()
    expect(orders.length).toBe(1)
  })
})

//////////////////////////////////////////////////////// OrderProduct Model //////////////////////////////////
// Note: we have created some order products in endpoints test

describe('Testing OrderProduct Model', () => {
  it('should create order product', async () => {
    let orderProduct = new OrderProduct({ orderId: 1, productId: 3, quantity: 8 })
    orderProduct = await orderProduct.save()
    expect(orderProduct.quantity).toBe(8)
  })

  it('should update order product', async () => {
    let orderProduct = new OrderProduct({ id: 2, orderId: 1, productId: 3, quantity: 12 })
    orderProduct = await orderProduct.save()
    expect(orderProduct.quantity).toBe(12)
  })

  it('should get an order product', async () => {
    let orderProduct = await OrderProduct.findOne({ orderId: 1, productId: 3 })
    expect(orderProduct?.id).toBe(2)
  })

  it('should get All order products', async () => {
    let ordeProducts = await OrderProduct.findAll()
    expect(ordeProducts.length).toBe(1)
  })

  it('should delete order product', async () => {
    let ordeProduct = await OrderProduct.findOne({ orderId: 1, productId: 3 })
    await ordeProduct?.remove()
    const ordeProducts = await OrderProduct.findAll()
    expect(ordeProducts.length).toBe(0)
  })
})
