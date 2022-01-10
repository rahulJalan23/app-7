import axios from 'axios';
import backendUrl from './backendUrl';

const getAllTransactions = async (token) => {
  let config = {
    headers: {
      'x-auth-token': token,
    },
  };
  console.log(config);
  const response = await axios.get(`${backendUrl}/transaction/get`, config);
  return response.data;
};

const addTransaction = async (data, token) => {
  let config = {
    headers: {
      'x-auth-token': token,
    },
  };
  console.log(config);
  const response = await axios.post(`${backendUrl}/file/upload`, data, config);
  return response.data;
};

const validateTransation = async function validateTransationById(
  data,
  id,
  token
) {
  let config = {
    headers: {
      'x-auth-token': token,
    },
  };
  console.log(config);
  const response = await axios.post(
    `${backendUrl}/transaction/validate/${id}`,
    data,
    config
  );
  return response.data;
};

const getTransactionTableById = async (id, token) => {
  let config = {
    headers: {
      'x-auth-token': token,
    },
  };
  console.log(config);
  const response = await axios.get(
    `${backendUrl}/transaction/table/${id}`,
    config
  );
  return response.data;
};

const transService = {
  getAllTransactions,
  addTransaction,
  validateTransation,
  getTransactionTableById,
};

export default transService;
