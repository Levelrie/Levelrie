import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import './RegisterForm.css';

function AdminRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerAdmin = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADMIN_REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className='registerForm' onSubmit={registerAdmin}>
      {/* <img onClick={onHome} src='https://res.cloudinary.com/dgainc6rr/image/upload/v1667588949/Logo/Levelrie_Logo_ipecqt.png'/> */}
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField 
          id="username" 
          label="username" 
          variant="outlined"
          type="text"
          margin="dense"
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
          margin="dense"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)} 
        />
      </div>
      <div>
        <Button variant="contained" type="submit" value="Register">
          Register
        </Button>
      </div>
    </form>
  );
}

export default AdminRegisterForm;
