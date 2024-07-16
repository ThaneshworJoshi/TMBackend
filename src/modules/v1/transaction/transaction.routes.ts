import express, { type Request, type Response, type Router } from 'express';

import {
  getTransactions,
} from './transaction.controller';
const tranactionRouter: Router = express.Router();

// Read All Transactions
tranactionRouter.get('/', getTransactions);

export default tranactionRouter;
