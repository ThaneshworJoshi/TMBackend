import * as Joi from 'joi';

// Define individual field schemas
const amount = Joi.number().min(0).required().label('Transaction Amount');
const date = Joi.date().default(Date.now).label('Transaction Date');
const type = Joi.string().valid('credit', 'debit').required().label('Transaction Type');
const status = Joi.string().valid('pending', 'completed', 'failed').required().label('Transaction Status');
const description = Joi.string().allow('').optional().label('Transaction Description');

/* ==========================================================================
  -- Transaction Schema
========================================================================== */
export const transactionSchema = Joi.object({
  amount,
  date,
  type,
  status,
  description,
});