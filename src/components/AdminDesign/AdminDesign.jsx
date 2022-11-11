import React from 'react';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//  Component Import
import LogOutAdminButton from '../LogOutAdminButton/LogOutAdminButton';



function AdminDesign() {
  return (
    <div className="container">
      <LogOutAdminButton />
      <div>
        <p>This is ADMIN DESIGN!</p>
      </div>
    </div>
  );
}

export default AdminDesign;