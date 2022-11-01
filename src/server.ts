import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()
import routes from './routes'

const PORT = process.env.PORT || 3000
const app: Application = express()
app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'StoreFrontBackend'
  })
})

app.use('/api/v1', routes)

// Global Response for tryCatch
app.use(async (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).send({Error: err})
})

app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT} ENV=${process.env.ENV}`)
})

export default app
