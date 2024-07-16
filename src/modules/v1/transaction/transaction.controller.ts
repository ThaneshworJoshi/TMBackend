import { Request, Response } from 'express';
import HttpStatusCodes from '@src/constants/HTTPStatusCode';

import * as transactionService from './transaction.service';
import { asyncHandler } from "@src/middlewares/asyncHandler";

/**
 * @description Get all transactions for the authenticated user
 * @route GET /api/v1/transactions
 * @access Private (assuming user is authenticated)
 */
export const getTransactions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10; // Default per page to 10 if not provided

    const transactions = await transactionService.getTransactions(page, perPage);
    const totalCount = await transactionService.getTransactionCount();
    const totalPages = Math.ceil(totalCount / perPage);

    res.status(HttpStatusCodes.OK).json({
      success: true, data: {
        transactions, pagination: {
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalCount: totalCount,
        },
      },
    });
  } catch (error: any) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to retrieve transactions' });
  }
});
