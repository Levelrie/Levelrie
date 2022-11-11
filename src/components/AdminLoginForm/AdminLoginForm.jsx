import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

//  CSS Import
import './AdminLoginForm.css'

function AdminLoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(store => store.errors);
  const dispatch = useDispatch();

   //  function to dispatch inputs for login process
  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'ADMIN_LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } //  end IF
    else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    } //  end ELSE
  }; // end login function

  //  form element with stacked textfields and button to allow
  //  users to login to their admin account
  return (
    <form className='adminLoginForm' onSubmit={login}>
      {error.adminLoginMessage && (
        <h3 id="alertMsg" className="alert" role="alert">
          {error.adminLoginMessage}
        </h3>
      )}
      <Stack direction="column"  spacing={1} alignItems="center">
        <TextField 
          id="username" 
          label="username" 
          variant="outlined"
          type="text"
          size="small"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)} 
        />   
        <TextField 
          id="password" 
          label="password" 
          variant="outlined"
          type="password"
          size="small"
          required
           value={password}
           onChange={(event) => setPassword(event.target.value)}
         />
         <Button variant="contained" type="submit">
           Login
         </Button>
       </Stack>
    </form>
  );
}
export default AdminLoginForm;