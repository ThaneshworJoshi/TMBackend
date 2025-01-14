import * as Joi from 'joi'

const email = Joi.string().email().min(8).max(240).lowercase().trim().required()

const password = Joi.string()
  .min(8)
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?[\d]).*$/u)
  .message('{{#label}} must contain one uppercase one lowercase letter, and one digit')
  .required()

const confirmPassword = Joi.any()
  .equal(Joi.ref('password'))
  .required()
  .label('confirm password')
  .messages({ 'any.only': '{{#label}} does not match' })

const refreshToken = Joi.string().required()

const code = Joi.string()
  .required()
  .messages({
    'any.required': 'Verification code is required',
    'string.length': 'Verification code must be 6 characters long',
  })
  .length(6)
  .message('Verification code must be 6 characters long')

const token = Joi.string().required().messages({
  'any.required': 'Verification token is required',
})

const ip_address = Joi.string()
  .required()
  .ip({
    version: ['ipv4'], // Specify IPv4 if you want to restrict to IPv4 addresses only
    cidr: 'forbidden' // Disallow CIDR notation
  })
  .messages({
    'any.required': 'IP address is required',
    'string.ip': 'IP address must be a valid IPv4 address',
    'string.ipVersion': 'IP address must be an IPv4 address'
  });

/* ==========================================================================
  -- User Login Schema
========================================================================== */
export const loginSchema = Joi.object({
  email,
  password,
  ip_address
})

/* ==========================================================================
  -- User Register Schema
========================================================================== */
export const registerSchema = Joi.object({
  email,
  password,
  confirmPassword,
})

/* ==========================================================================
  -- User Email Verification Schema
========================================================================== */
export const emailVerificationSchema = Joi.object({
  email,
  code,
})

/* ==========================================================================
  -- Reset Password  Schema
========================================================================== */
export const resetPasswordSchema = Joi.object({
  email,
})

/* ==========================================================================
-- Reset Password  Schema
========================================================================== */
export const updatePasswordSchema = Joi.object({
  token,
  password,
})
