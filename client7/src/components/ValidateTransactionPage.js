import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Container,
  Checkbox,
} from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import transService from '../services/transaction';

async function getTransactionTable(id, token) {
  const response = await transService.getTransactionTableById(id, token);
  return response;
}

function ValidateTransactionPage(props) {
  let [arrayTransRow, setArrayTransRow] = useState([]);
  // const transactionId = searchParams.get('id');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    //   console.log(transactionId);
    console.log(id);
    const token = localStorage.getItem('token');
    if (token) {
      const response = getTransactionTable(id, token);
      response.then((data) => {
        console.log(data);
        const myArray = data.map((row) => {
          if (row.status) {
            row.status = true;
          } else {
            row.status = false;
          }
          return row;
        });
        setArrayTransRow(myArray);

        // setChecked([myArray]);
      });
    } else {
      navigate('/login');
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit Button Clicked');
    const token = localStorage.getItem('token');
    if (token) {
      let transactions = await arrayTransRow.map((row, index) => {
        if (arrayTransRow[index].status) {
          arrayTransRow[index].status = 1;
        } else {
          arrayTransRow[index].status = 2;
        }
        return row;
      });

      const request = {
        transactions,
      };

      console.log(request);
      // const response = await transService.validateTransation(
      //   request,
      //   id,
      //   token
      // );
      // console.log(response);
    } else {
      navigate('/login');
    }
  };

  const handleChange = (event, index) => {
    console.log(event.target.checked);
    const myArray = arrayTransRow;
    if (event.target.checked === true) {
      myArray[index].status = true;
      console.log(myArray);
      setArrayTransRow(myArray);
    } else {
      myArray[index].status = false;
      setArrayTransRow(myArray);
    }
  };

  const convertToBool = (status) => {
    console.log(status, 'this is from convert to bool');
    if (status == 1) {
      return true;
    } else return false;
  };
  return (
    <div style={{ width: '80%', margin: 'auto', marginBottom: '50px' }}>
      <Typography
        component="h1"
        align="center"
        style={{
          marginBottom: '20px',
          color: '#B34FAE',
        }}
        variant="h3"
      >
        Validate Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayTransRow.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align="right">{row.transId}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                {/* <TableCell align="right">{row.status}</TableCell> */}
                <TableCell align="right">
                  <Checkbox
                    checked={row.status}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container
        style={{
          marginTop: '20px',
        }}
      >
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
      </Container>
    </div>
  );
}

export default ValidateTransactionPage;
