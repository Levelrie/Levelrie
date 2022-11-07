import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };
  const onRegister = (event) => {
    history.push('/registration');
  };
  const onHome = (event) => {
    history.push('/home');
  };

  return (
    <div className='landing'>
      <img onClick={onHome} src='https://res.cloudinary.com/dgainc6rr/image/upload/v1667588949/Logo/Levelrie_Logo_ipecqt.png'/>
      <div className='login-btn'>
        <Button 
          variant="contained"
          onClick={onLogin}
        >
          Log-in
        </Button>
      </div>
      <div className='register-btn'>
        <Button 
          variant="contained"
          onClick={onRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;