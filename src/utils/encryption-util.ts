import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const encrypt = async (plainText: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(plainText, salt)
}

export const validate = async (plainText: string, original: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await bcrypt.compare(plainText, original)
  } catch (error) {
    throw error
  }
}

export const createHash = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export const randomKey = (length = 12) => {
  return crypto.randomBytes(length).toString('hex')
}

export const randomNumber = (length = 6) => {
  let text = ''
  const possible = '123456789'
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length)
    text += i > 0 && sup == i ? '0' : possible.charAt(sup)
  }
  return Number(text)
}
