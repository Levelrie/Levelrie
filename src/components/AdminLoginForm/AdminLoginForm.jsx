import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

//  MUI Tools
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function AdminLoginForm() {

  //  Local State for Input Fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const admin_error = useSelector(store => store.admin_errors);

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
      dispatch({ type: 'ADMIN_LOGIN_INPUT_ERROR' });
    } //  end ELSE
  }; // end login function

  return (
    <form className='loginForm' onSubmit={login}>
      {admin_error.loginMessage && (
        <h3 className="alert" role="alert">
          {admin_error.loginMessage}
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
        <Button variant="contained" type="submit" value="Log In">
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default AdminLoginForm;
