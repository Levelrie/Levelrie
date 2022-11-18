import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: false
      },
    });
  }; // end registerUser

  const history = useHistory();

  const onHome = (event) => {
    history.push('/landing');
  };

  return (
    <form className='registerForm' onSubmit={registerUser}>
      <img onClick={onHome} src='https://res.cloudinary.com/dgainc6rr/image/upload/v1667588949/Logo/Levelrie_Logo_ipecqt.png'/>
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
          type="password"
          margin="dense"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)} 
        />
      </div>
      <div>
      <TextField 
          id="firstName" 
          label="First Name" 
          variant="outlined"
          type="text"
          margin="dense"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)} 
        />
      </div>
      <div>
        <TextField 
          id="lastName" 
          label="Last Name" 
          variant="outlined"
          type="text"
          margin="dense"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)} 
        />
      </div>
      <div>
        <TextField 
          id="email" 
          label="Email" 
          variant="outlined"
          type="text"
          margin="dense"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)} 
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

export default RegisterForm;
