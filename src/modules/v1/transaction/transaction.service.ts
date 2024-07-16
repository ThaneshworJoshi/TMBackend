
import Transaction from "@src/database/mongodb/models/transaction.model";
import transactionMockData from "@src/mock";

/**
 * Get all transactions (assuming retrieval for authenticated user)
 * @returns {Promise<Array<Transaction>>} An array of task objects
 */
const getTransactions = async (page: number, perPage: number) => {
  try {
    const skip = (page - 1) * perPage;
    const transactions = await Transaction.find().skip(skip).limit(perPage).lean();
    return transactions;
  } catch (error) {
    throw error;
  }
};

/**
 * Get total count of transactions (assuming retrieval for authenticated user)
 * @returns {Promise<number>} Total count of transactions
 */
const getTransactionCount = async (): Promise<number> => {
  try {
    const totalCount = await Transaction.countDocuments();
    return totalCount;
  } catch (error) {
    throw error;
  }
};


export { getTransactions, getTransactionCount };
