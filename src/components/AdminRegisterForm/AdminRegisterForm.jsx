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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const error = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  //  function to dispatch inputs for registration process
  const registerAdmin = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch ({
        type: 'REGISTER_ADMIN',
        payload: {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email
        },
      });
    } //  end IF
    else {
      dispatch ({ type: 'REGISTER_INPUT_ERROR' });
    } //  end ELSE
  } //  end registerUser function

  //  form element with stacked textfields and button to allow
  //  users to register an admin account
  return (
    <form className='adminRegisterForm' onSubmit={registerAdmin}>
      {error.registrationMessage && (
        <h3 id="alertMsg" className="alert" role="alert">
          {error.registrationMessage}
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
        <TextField 
          id="firstName" 
          label="First Name" 
          variant="outlined"
          type="text"
          size="small"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)} 
        />
        <TextField 
          id="lastName" 
          label="Last Name" 
          variant="outlined"
          type="text"
          size="small"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)} 
        />
        <TextField 
          id="email" 
          label="Email" 
          variant="outlined"
          type="text"
          size="small"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)} 
        />
        <Button variant="contained" type="submit" value="Register">
          Register
        </Button>
      </Stack>
    </form>
  );
}
export default AdminRegisterForm;