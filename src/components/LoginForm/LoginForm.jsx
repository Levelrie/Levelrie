import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

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
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const history = useHistory();

  const onHome = (event) => {
    history.push('/landing');
  };

  return (
    <form className='loginForm' onSubmit={login}>
      <img onClick={onHome} src='https://res.cloudinary.com/dgainc6rr/image/upload/v1667588949/Logo/Levelrie_Logo_ipecqt.png'/>
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
        type="password"
        margin="normal"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      </div>
      <div>
        <Button variant="contained" type="submit" value="Log In">
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
