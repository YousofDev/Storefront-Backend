import express from 'express'
import {
  login,
  editUser,
  deleteUser,
  createUser,
  getAllUsers,
  getUser,
  logout,
  requireLogin
} from '../../controllers/users'

const users = express.Router()

users.post('/me/login', login)

users.post('/me/logout', logout)

users.post('/', createUser)

users.use(requireLogin)

users.get('/', getAllUsers)

users.get('/:id', getUser)

users.put('/:id', editUser)

users.delete('/:id', deleteUser)

export default users
