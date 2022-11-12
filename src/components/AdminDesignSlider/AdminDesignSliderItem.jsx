import React, { useEffect, Component }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function AdminDesignSliderItem({item}) {

  return (
    <Card sx={{ height: '14vh', margin: 1, padding: 1, backgroundColor: "pink", }}>
      <CardMedia
        sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
        className="itemSliderImg"
        component="img"
        image={item.img}
        alt={item.name}
      />
    </Card>
  );
}

export default AdminDesignSliderItem;

