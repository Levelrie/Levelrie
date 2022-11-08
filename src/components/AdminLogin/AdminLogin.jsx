import React, { useState } from 'react';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import './AdminLogin.css'

function AdminLogin() {

  //  local state used to set toggle button
  const [isFront, setIsFront] = useState(true)
  //  on click to alter toggle button
  const handleClick = (e) => {
    // console.log('this', e.currentTarget)
    setIsFront(current => !current)  
  }


//  The Admin Login-Register page display contains the following elements:
//  Box - set to match the entire browser display height and width with the
//    hanger logo set to repeat for background
//  Card 1 - a centered mid-background utilizing the basePink with a baseTan border
//  Card 2 - a centered card displaying the company logo, login/register toggle,
//    username input, password input and conditional button based on toggle

  return (
    <Box className='box' sx={{width: '100vw', height: '100vh', display: 'center'}} >
      <Card className='outerCard' sx={{width: '50vw', height: '75vh', display: 'center', bgcolor: '#f1b3f2', border: '10px solid #BFA78A', borderRadius: 4}} variant='outlined' bgc='red'>
        <Card className='innerCard' sx={{width: '40vw', height: '65vh', display: 'center'}}>
          <CardContent className="adminLoginCard">
            <Stack direction="column"  spacing={1} alignItems="center" sx={{mt: -9}}>
              <CardMedia
                sx={{mb: -6}}
                className="adminLoginCard"
                component="img"
                image="https://res.cloudinary.com/dgainc6rr/image/upload/v1667860497/Logo/cropped-logo_so1shs.png"
                alt="Levelrie Logo"
              />
              {/* <Typography sx={{mt: -5}} color='#434343'>Admin Login</Typography> */}
              <Stack direction='row' justifyContent='center'>
                <Button variant='contained' color='baseTan' id='outfitButton' className={isFront ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={handleClick}>Login</Button>
                <Button variant='contained' color='basePink' id='categoryButton' className={!isFront ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={handleClick}>Register</Button>
              </Stack>
              <TextField id="outlined-basic" margin='dense' label="username" variant="outlined" />
              <TextField id="outlined-basic" label="password" variant="outlined" />
              
              {/* Conditional changes to button based on toggle selection above */}
              {isFront ? <Button variant="contained">Login</Button> : 
                <Button variant="contained">Register</Button>}
            </Stack>
          </CardContent>
        </Card>
      </Card>
    </Box>
  );
}

export default AdminLogin;