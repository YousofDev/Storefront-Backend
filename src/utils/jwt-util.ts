import jwt, { Secret } from 'jsonwebtoken'
import { Request } from 'express'

interface DecodeType {
  iat?: number
  exp?: number
  aud?: string
}

export const createToken = (
  userId: number,
  secret: Secret = 'SECRETKEY',
  expiresIn: string
): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const payload = {}
    const options = {
      expiresIn,
      issuer: 'localhost:3000',
      audience: userId.toString()
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return null
      }
      resolve(token)
    })
  })
}

export const verifyToken = (
  token: string,
  secret: Secret = 'SECRETKEY'
): Promise<DecodeType | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, secret, async (err, payload) => {
      if (err) {
        return null
      }
      const decoded: DecodeType = {}
      Object.assign(decoded, payload)
      resolve(decoded)
    })
  })
}

export const getToken = (req: Request): string | null => {
  let token
  const authorization = req.headers.authorization
  if (authorization && (authorization.startsWith('Bearer') || authorization.startsWith('Token'))) {
    token = authorization.split(' ')[1]
  } else if (typeof req.cookies.jwt !== 'undefined' || req.cookies.jwt !== null) {
    token = req.cookies.jwt
  }

  if (!token) {
    return null
  }

  return token
}
