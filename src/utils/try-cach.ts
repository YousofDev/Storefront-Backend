import { Request, Response, NextFunction, RequestHandler } from 'express'

const tryCatch = (func: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(func(req, res, next)).catch(next)

export default tryCatch
