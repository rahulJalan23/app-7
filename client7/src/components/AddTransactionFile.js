import { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import transService from '../services/transaction';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Form = () => {
  const classes = useStyles();
  // create state variables for each input
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      const formData = new FormData();

      // Update the formData object
      formData.append('csvfile', file, file.name);

      // Details of the uploaded file
      console.log(file);

      // Request made to the backend api
      // Send formData object
      const response = await transService.addTransaction(formData, token);
      // setTimeout(myFunc, 2000);

      console.log(response);
      navigate(`/transaction/validate/${response.transactionTableId}`);
    } else {
      navigate('/login');
    }
  };
  // const handleChange = (event) => {};
  return (
    <>
      <Typography variant="h4" component="h2">
        Add Transaction File
      </Typography>

      <form className={classes.root} onSubmit={handleSubmit}>
        <input type="file" name="" onChange={onFileChange} />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
