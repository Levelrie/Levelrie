import React from 'react';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './AdminLogin.css'

function AdminLogin() {

  return (
    <Box className='box' sx={{width: '100vw', height: '100vh', align: 'center', justify: 'center'}} >
      <Card className='outerCard' sx={{width: '50vw', height: '75vh', display: 'center'}} variant='outlined'>
        <Card className='innerCard' sx={{width: '25vw', height: '50vh', display: 'center'}}>

        </Card>
      </Card>
    </Box>
  );
}

export default AdminLogin;