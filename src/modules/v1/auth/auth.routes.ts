import express, { type Request, type Response, type Router } from 'express'

import validate from '@src/middlewares/validateApiSchema'

import {
  emailVerificationSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from './auth.api.schema'
import {
  loginUser,
  registerUser,
  resetPasswordController,
  updatePasswordController,
  verifyEmail,
} from './auth.controller'
import HttpStatusCodes from '@src/constants/HTTPStatusCode'

const authRouter: Router = express.Router()

//* User
authRouter.post('/register', registerUser)

authRouter.post('/login', validate(loginSchema), loginUser)

authRouter.get('/google', (req: Request, res: Response) => {
  res.send('Login with google Route')
})

authRouter.get('/google/callback', (req: Request, res: Response) => {
  res.send('Login with google Route')
})

authRouter.post('/logout', (req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).send({
    success: true,
    message: 'User Logged Out Successfully'
  })
})

authRouter.post('/reset-password', validate(resetPasswordSchema), resetPasswordController)
authRouter.post('/update-password', validate(updatePasswordSchema), updatePasswordController)

authRouter.post('/send-verification-code', (req: Request, res: Response) => {
  res.send('User Send verification code Route')
})

authRouter.post('/verify-email', validate(emailVerificationSchema), verifyEmail)

authRouter.post('/logout', (req: Request, res: Response) => {
  res.send('User Logout Route')
})

//* Admin
authRouter.post('/admin/login', (req: Request, res: Response) => {
  res.send('Admin Auth Route')
})

export default authRouter
