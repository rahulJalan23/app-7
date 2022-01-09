const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const cors = require('cors');

require('dotenv').config();

const morgan = require('morgan');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log("I'm connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
const { login, register } = require('./controllers/user');

app.post('/login', login);
app.post('/register', register);

const {
  addTransactionFile,
  getAllTransactions,
  getAllTransactionByUser,
  getPendingTransactionByUser,
  getTransactionById,
  validateTransaction,
  getTransactionRowsByTransactionTableId,
} = require('./controllers/transaction');

app.post('/file/upload', auth, addTransactionFile); //
app.get('/transaction', auth, getAllTransactionByUser);
app.get('/transaction/pending', auth, getPendingTransactionByUser);
app.get('/transaction/:id', auth, getTransactionById);

app.get('/transaction/table/:id', auth, getTransactionRowsByTransactionTableId);
app.post('/transaction/validate/:id', auth, validateTransaction);

/////////////////////////////////----------------------------------
// Test Routes
app.get('/all/transaction', getAllTransactions);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Welcome to the API.',
  });
});

module.exports = app;
