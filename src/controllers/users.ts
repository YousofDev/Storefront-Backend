import { User } from '../models/user'
import { Request, Response, NextFunction } from 'express'
import tryCatch from '../utils/try-cach'
import { setCookie, deleteCookie } from '../utils/cookie-util'
import { createToken, getToken, verifyToken } from '../utils/jwt-util'

export const login = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).send({ status: 401, message: 'Email or Password is wrong!' })
    return
  }

  const authenticated = await user.isValidPassword(password)
  if (!authenticated) {
    res.status(401).send({ status: 401, message: 'Email or Password is wrong!' })
    return
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE || '15d'
  const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE || '1y'

  if (user.id) {
    const accessToken = await createToken(user.id, accessTokenSecret, accessTokenExpire)
    const refreshToken = await createToken(user.id, refreshTokenSecret, refreshTokenExpire)

    setCookie(req, res, accessToken)

    user.password = undefined

    res.status(200).send({
      status: 200,
      message: 'User Loged in Successfully',
      data: user,
      accessToken,
      refreshToken
    })
  }
})

export const requireLogin = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)
  if (!token) {
    res.status(403).send({ status: 403, message: 'You are not logged in!' })
    return
  }

  if (token) {
    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
      res.status(403).send({ status: 403, message: 'Token not valid!' })
      return
    }

    const user = await User.findOne({ id: decoded.aud })
    if (!user) {
      res.status(401).send({ status: 401, message: 'There is no user belonging to this token!' })
      return
    }
  }
  next()
})

export const logout = (req: Request, res: Response) => {
  deleteCookie(req, res)
  res.status(200).send({
    status: 200,
    message: 'User Logged Out'
  })
}

export const getAllUsers = tryCatch(async (req: Request, res: Response) => {
  const users = await User.findAll()
  res.status(200).send({
    status: 200,
    results: users.length,
    data: users
  })
})

export const createUser = tryCatch(async (req: Request, res: Response) => {
  const existUser = await User.findOne({ email: req.body.email })
  if (existUser) {
    res.status(409).send({ status: 409, message: `${req.body.email} already exists!` })
    return
  }

  let user = new User(req.body)
  user = await user.save()
  user.password = undefined
  res.status(201).send({ status: 201, message: 'User Created Successfully', data: user })
})

export const getUser = tryCatch(async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req.params.id })
  if (!user) {
    res.status(404).send({ status: 404, message: 'There is no users with that id' })
    return
  }
  user.password = undefined
  res.status(200).send({
    status: 200,
    data: user
  })
})

export const editUser = tryCatch(async (req: Request, res: Response) => {
  let user = await User.findOne({ id: req.params.id })
  if (!user) {
    res.status(404).send({ status: 404, message: 'There is no users with that id' })
    return
  }
  if (user) {
    user = new User({ ...user, ...req.body })
    user = await user.save()
    user.password = undefined
  }

  res.status(200).send({
    status: 200,
    message: 'User Updated Successfully',
    data: user
  })
})

export const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const user = await User.deleteOne(parseInt(req.params.id))
  if (!user) {
    res.status(404).send({ status: 404, message: 'There is no users with that id' })
    return
  }
  res.status(204).send({
    status: 204,
    message: 'User Deleted Successfully',
    data: user
  })
})
