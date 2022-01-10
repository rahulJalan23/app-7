import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import transService from '../services/transaction';

async function getTransactionTable(id, token) {
  const response = await transService.getTransactionTableById(id, token);
  return response;
}

async function returnBool(status) {
  if (status) {
    status = true;
  } else {
    status = false;
  }
  return status;
}
function ValidateTransactionPage(props) {
  let [arrayTransRow, setArrayTransRow] = useState([]);
  // const transactionId = searchParams.get('id');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const token = localStorage.getItem('token');
    if (token) {
      const response = getTransactionTable(id, token);
      response.then((data) => {
        console.log(data);
        const myArray = data.map((row) => {
          row.status = returnBool(row.status);
          return row;
        });

        setArrayTransRow(myArray);
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
      const request = {};

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'index',
      headerName: 'Index',
      width: 150,
      editable: true,
    },

    {
      field: 'age',
      headerName: 'Date',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Amount',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [];
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

      {/*  //////////////////////
       Data Grid Goes here. 
       //////////////////////////
       */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
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
