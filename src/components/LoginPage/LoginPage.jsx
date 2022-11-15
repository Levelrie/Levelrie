import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import '../LoginForm/LoginForm.css';
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />
      <div className='LoginPage'>
        <Button 
          variant="contained"
          onClick={() => {
            history.push('/landing');
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
