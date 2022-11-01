import Repository from '../database/repository'
const productRepo = Repository.table('products')

export interface ProductBase {
  id?: number
  name: string
  price: number
}

export class Product {
  id?: number
  name: string
  price: number

  constructor(data: ProductBase) {
    this.id = data.id
    this.name = data.name
    this.price = data.price
  }

  async save() {
    const product: ProductBase = { name: this.name, price: this.price }
    if (!this.id) {
      return await productRepo.insert(product)
    }
    return await productRepo.update(this.id, product)
  }

  async remove() {
    if (this.id) {
      return await productRepo.delete(this.id)
    }
  }

  static async findAll(): Promise<Product[]> {
    return await productRepo.find({})
  }

  static async findOne<T>(where: T): Promise<Product | null> {
    const products = await productRepo.find(where)
    return products[0] ? new Product(products[0]) : null
  }

  static async updateOne(id: number, product: ProductBase): Promise<Product> {
    return await productRepo.update(id, product)
  }

  static async deleteOne(id: number): Promise<Product> {
    return await productRepo.delete(id)
  }
}
