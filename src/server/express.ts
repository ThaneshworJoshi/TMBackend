import cookieParser from 'cookie-parser'
import express, { type Application } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'
import configKeys from '@src/config'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many request from this IP, please try again later.',

  keyGenerator: (req) => {
    const xRealIp = req.headers['x-real-ip']
    const ipToUse = xRealIp ?? req.ip ?? req.socket?.remoteAddress

    if (!ipToUse) {
      console.error('Warning: IP address is missing!')
      return 'unknown-ip'
    }

    return String(ipToUse).replace(/:\d+[^:]*$/, '')
  },
})

const configureExpressApp = (app: Application) => {
  // Development logging
  if (configKeys.NODE_ENV === 'development') {
    // app.use(httpLogger)
  }

  app.set('trust proxy', true) // Enable trust for X-Forwarded-* headers
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(limiter)
  app.use(cors({ origin: 'http://localhost:5173' }));
  app.use(cookieParser())
  app.use(mongoSanitize())
  app.use(helmet())
}

export default configureExpressApp
