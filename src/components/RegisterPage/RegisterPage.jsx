import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import '../RegisterForm/RegisterForm.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
      <div className='RegisterPage'>
        <Button 
          variant="text"
          onClick={() => {
            history.push('/home');
          }}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
