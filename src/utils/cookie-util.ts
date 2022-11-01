import { Request, Response } from 'express'

export const setCookie = (req: Request, res: Response, token: string | undefined) => {
  //   const expire: number = parseInt(process.env.TOKEN_EXPIRE | '')
  const expire = 10
  const cookieOptions = {
    expires: new Date(Date.now() + expire * 1000 * 60 * 60 * 24),
    httpOnly: true
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  }

  //   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  if (token) res.cookie('jwt', token, cookieOptions)
}

export const deleteCookie = (req: Request, res: Response) => {
  res.clearCookie('jwt')
}
