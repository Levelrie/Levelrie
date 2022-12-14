import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//  MUI Tools
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

//  CSS Import
import './AdminLoginForm.css'

function AdminLoginForm() {

  const dispatch = useDispatch();
  const history = useHistory();

  //  Local state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //  Reducer store data
  const error = useSelector(store => store.errors);

   //  function to dispatch inputs for login process
  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/admin/design');
    } //  end IF
    else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    } //  end ELSE
  }; // end login function

  //  form element with stacked textfields and button to allow
  //  users to login to their admin account
  return (
    <form className='adminLoginForm' onSubmit={login}>
      {error.loginMessage && (
        <h3 id="alertMsg" className="alert" role="alert">
          {error.loginMessage}
        </h3>
      )}
      <Stack direction="column"  spacing={1} alignItems="center">
        <TextField 
          id="username" 
          label="username" 
          variant="outlined"
          type="text"
          // size="small"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)} 
        />   
        <TextField 
          id="password" 
          label="password" 
          variant="outlined"
          type="password"
          // size="small"
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