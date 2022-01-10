import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import transService from '../services/transaction';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

function Dashboard() {
  const navigate = useNavigate();
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    // transService.getAllTransactions(token).then((data) => {
    //   console.log(data);
    //   setTransList(data.transactions);
    // });
  }, [navigate]);

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      {/* <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Party Name</TableCell>
              <TableCell align="right">Party Username</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transList.map((row) => (
              <TableRow
                key={row.id}
                style={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.party.name}
                </TableCell>
                <TableCell align="right">{row.party.username}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <div
        style={{
          marginTop: '50px',
        }}
      >
        <Button variant="outlined" disableElevation>
          <Link to="/transaction/add">Add Transactions</Link>
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
