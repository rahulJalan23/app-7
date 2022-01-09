const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionTable = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    transaction: [{ type: Schema.Types.ObjectId, ref: 'TransactionRow' }],
    status: {
      type: Number,
      default: 0, // change to 1 once set
    },
    totalTransaction: {
      type: Number,
      default: 0,
    },
    totalApproved: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalReward: {
      type: Number,
      default: 0,
    },
    totalNetAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const transactionRow = Schema({
  transId: String,
  date: String,
  amount: { type: Number, default: 0 },
  status: { type: Number, default: 0 }, // 0 for not decided, 1 for approved , 2 for not approved
  transactionTable: { type: Schema.Types.ObjectId, ref: 'TransactionTable' },
  reward: { type: Number, default: 0 },
  netAmount: { type: Number, default: 0 },
});

const TransactionTable = mongoose.model('TransactionTable', transactionTable);
const TransactionRow = mongoose.model('TransactionRow', transactionRow);

module.exports = {
  TransactionTable,
  TransactionRow,
};
