const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const path = require('path');
const { TransactionTable, TransactionRow } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

async function addKeys(myArray, document) {
  await myArray.forEach(async (element) => {
    await document.transaction.push(element);
    await document.save();
  });
}
const myPath = `uploads/${req.file.filename}`;
const addTransactionFile = [
  upload.single('csvfile'),
  async (req, res) => {
    console.log(req.file);
    const transactionTable = await new TransactionTable({
      user: req.user._id,
      transaction: [],
      title: req?.body?.title,
    });
    const transactionTableSaved = await transactionTable.save();
    let transactionList = [];
    await fs
      .createReadStream(`uploads/${req.file.filename}`)
      .pipe(csv())
      .on('data', async function (data) {
        try {
          const amount = parseInt(data.Amount);
          const newRecord = new TransactionRow({
            transId: data['Transaction ID'],
            date: data.Date,
            amount,
            transactionTable: transactionTableSaved._id,
          });
          const savedTransactionRecord = await newRecord.save();
          // transactionList.push(savedTransactionRecord._id);
        } catch (err) {
          console.log(err);

          return res
            .status(400)
            .send({ err, message: 'Error while parsing csv file.' });
        }
      })
      .on('end', async function () {
        console.log('After All Operations');

        res.send({
          msg: 'file saved',
          transactionTableId: transactionTableSaved._id,
        });
      });

    setTimeout(() => {
      fs.unlinkSync(myPath);
    }, 20000);
  },
];

const getAllTransactions = async (req, res) => {
  const allData = await TransactionTable.find();
  return res.send(allData);
};

const getAllTransactionByUser = async (req, res) => {
  const query = await TransactionTable.find({ user: req.user.id });
  return res.send({ count: query.length, data: query });
};

const getPendingTransactionByUser = async (req, res) => {
  const query = await TransactionTable.find({ user: req.user.id, status: 0 });
  return res.send({ count: query.length, data: query });
};
const getTransactionById = async (req, res) => {
  const query = await TransactionTable.findOne({ _id: req.params.id });
  return res.send({ data: query });
};

// post transaction/validate
const getTransactionRowsByTransactionTableId = async (req, res) => {
  const transaction = await TransactionRow.find({
    transactionTable: req.params.id,
  });
  res.send(transaction);
};

const validateTransaction = async (req, res) => {
  const dataValues = req.body.transactions;
  let totalTransaction = 0;
  let totalApproved = 0;
  let totalAmount = 0;
  let totalReward = 0;
  let totalNetAmount = 0;
  dataValues.forEach(async (element) => {
    const row = await TransactionRow.findById(element._id);

    if (element.status == 1 || element.status == '1') {
      row.status = 1;
      totalApproved += 1;
      totalAmount += row.amount;
      row.reward = Math.round(row.amount * 0.1);
      totalReward += row.reward;
      row.netAmount = Math.round(row.amount * 0.9);
      totalNetAmount += row.netAmount;
      totalTransaction += 1;
    } else if (element.status == 2 || element.status == '2') {
      row.status = 2;
      totalTransaction += 1;
    } else {
      row.status = 2;
      totalTransaction += 1;
    }
    await row.save();
  });
  res.send({ message: 'Records Saved.' });

  const transactionTable = await TransactionTable.findById(req.params.id);
  transactionTable.status = 1;
  transactionTable.totalApproved = totalApproved;
  transactionTable.totalTransaction = totalTransaction;
  transactionTable.totalAmount = totalAmount;
  transactionTable.totalReward = totalReward;
  transactionTable.totalNetAmount = totalNetAmount;

  transactionTable.save();
  // status change the transactions that are unwanted
  // store reward
  // store net-amount
  return;
};

module.exports = {
  addTransactionFile,
  getAllTransactions,
  getAllTransactionByUser,
  getPendingTransactionByUser,
  getTransactionById,
  validateTransaction,
  getTransactionRowsByTransactionTableId,
};
