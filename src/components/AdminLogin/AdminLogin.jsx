import React, { useState } from 'react';

//  Components
import AdminLoginForm from '../AdminLoginForm/AdminLoginForm';
import AdminRegisterForm from '../AdminRegisterForm/AdminRegisterForm';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//  CSS import
import './AdminLogin.css'

function AdminLogin() {

  //  local state used to set toggle button
  const [isFront, setIsFront] = useState(true)
  
  //  on click to alter toggle button
  const handleClick = (e) => {
    setIsFront(current => !current)  
  } //  end handleClick function

//  The Admin Login-Register page display contains the following elements:
//  Box - set to match the entire browser display height and width with the
//    hanger logo set to repeat for background
//  Card 1 - a centered mid-background utilizing the basePink with a baseTan border
//  Card 2 - a centered card displaying the company logo, login/register toggle,
//    username input, password input and conditional button based on toggle

  return (
    <Box className='box' sx={{width: '100vw', height: '100vh', display: 'center'}} >
      <Box className={isFront ? 'outerLoginCard' : 'outerRegisterCard'} sx={{display: 'center', bgcolor: '#f1b3f2', border: '10px solid #BFA78A', borderRadius: 4, mt: 3}} variant='outlined' bgc='red'>
        <Card className={isFront ? 'innerLoginCard' : 'innerRegisterCard'} sx={{display: 'center'}}>
          <CardContent className="adminLoginCard" sx={{height: '40vh', display: 'center'}}>
            <Stack direction="column"  spacing={2} alignItems="center">
              <CardMedia
                className="adminLoginCard"
                component="img"
                image="https://res.cloudinary.com/dgainc6rr/image/upload/v1668023176/Logo/levelrie_ly6his.png"
                alt="Levelrie Logo"
              />
              <Stack direction='row' justifyContent='center'>
                <Button 
                  variant='contained' 
                  size="small" 
                  color='baseTan' 
                  id='outfitButton' 
                  className={isFront ? 'frontButton' : ''} 
                  sx={{borderRadius: 3 , width: 100, left: 10, justifyContent: 'center'}} 
                  onClick={handleClick}>Login
                </Button>
                <Button 
                  variant='contained' 
                  size="small" 
                  color='basePink' 
                  id='categoryButton' 
                  className={!isFront ? 'frontButton' : ''} 
                  sx={{borderRadius: 3, width: 100, right: 10, justifyContent: 'center'}} 
                  onClick={handleClick}>Register
                </Button>
              </Stack>
              {isFront ? <AdminLoginForm /> : <AdminRegisterForm />}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AdminLogin;
