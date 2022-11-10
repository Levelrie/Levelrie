import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

//  CSS Import
import './AdminRegisterForm.css'

function AdminRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const admin_error = useSelector((store) => store.admin_errors);
  const dispatch = useDispatch();

  //  function to dispatch inputs for registration process
  const registerAdmin = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch ({
        type: 'ADMIN_REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
    } //  end IF
    else {
      dispatch ({ type: 'ADMIN_REGISTER_INPUT_ERROR' });
    } //  end ELSE
  } //  end registerUser function

  //  form element with stacked textfields and button to allow
  //  users to register an admin account
  return (
    <form className='adminRegisterForm' onSubmit={registerAdmin}>
      {admin_error.adminRegistrationMessage && (
        <h3 id="alertMsg" className="alert" role="alert">
          {admin_error.adminRegistrationMessage}
        </h3>
      )}
      <Stack direction="column"  spacing={2} alignItems="center">
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
        <Button variant="contained" type="submit" value="Register">
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default AdminRegisterForm;
