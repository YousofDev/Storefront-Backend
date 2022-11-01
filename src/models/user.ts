import { encrypt, validate } from '../utils/encryption-util'
import Repository from '../database/repository'
const userRepo = Repository.table('users')

export interface UserBase {
  id?: number
  firstName: string
  lastName: string
  email?: string
  password?: string
  role?: string
  isActive?: string
}

export class User {
  id?: number
  firstName: string
  lastName: string
  email?: string
  password?: string
  role?: string
  isActive?: string

  constructor(data: UserBase) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.password = data.password
    this.role = data.role
    this.isActive = data.isActive
  }

  async save(): Promise<User> {
    let user: UserBase = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      isActive: this.isActive
    }

    let hashedPassword = ''

    if (!this.id && this.password) {
      hashedPassword = await encrypt(this.password)
      user = await userRepo.insert({ ...user, password: hashedPassword })
    }

    if (this.id) {
      if (this.password) {
        hashedPassword = await encrypt(this.password)
        user = await userRepo.update(this.id, { ...user, password: hashedPassword })
      } else {
        user = await userRepo.update(this.id, user)
      }
    }
    return new User(user)
  }

  async remove(): Promise<User> {
    let user
    if (this.id) {
      user = await userRepo.delete(this.id)
    }
    return user
  }

  async isValidPassword(plainText: string): Promise<boolean> {
    let authenticate = false
    if (this.password) {
      authenticate = await validate(plainText, this.password)
    }
    return authenticate
  }

  static async findAll(): Promise<User[]> {
    return await userRepo.find({})
  }

  static async findOne<T>(where: T): Promise<User | null> {
    const users = await userRepo.find(where)
    return users[0] ? new User(users[0]) : null
  }

  static async deleteOne(id: number): Promise<User> {
    return await userRepo.delete(id)
  }

  static async updateOne(id: number, user: UserBase): Promise<User> {
    return await userRepo.update(id, user)
  }
}
