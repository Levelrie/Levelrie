import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

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
    } else {
      dispatch({ type: 'ADMIN_LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const history = useHistory();

  const onHome = (event) => {
    history.push('/home');
  };

  return (
    <form className='loginForm' onSubmit={login}>
      {/* <img onClick={onHome} src='https://res.cloudinary.com/dgainc6rr/image/upload/v1667588949/Logo/Levelrie_Logo_ipecqt.png'/> */}
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
      <TextField 
        id="username" 
        label="username" 
        variant="outlined"
        type="text"
        margin="normal"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)} 
      />
      </div>
      <div>
      <TextField 
        id="password" 
        label="password" 
        variant="outlined"
        type="text"
        margin="normal"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      </div>
      <div>
        <Button variant="contained" type="submit" value="Log In">
          Login
        </Button>
      </div>
    </form>
  );
}

export default AdminLoginForm;
