import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

function OutfitDesignBuilder() {

  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);

  return (
    <Card sx={{ height: '45vh', margin: 1, padding: 1, backgroundColor: "#F2DCF2", }}>
      <Stack direction="row" spacing={1}  width='100%' >
        <Stack direction="column" spacing={1} display='flex'>
          <CardContent>
            Outerwear
          </CardContent>
          {outerwear ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
            className="itemSliderImg"
            component="img"
            image={outerwear.img}
            alt={outerwear.name}
          /> : '' }
          <CardContent>
            Footwear
          </CardContent>
          {footwear ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
            className="itemSliderImg"
            component="img"
            image={footwear.img}
            alt={footwear.name}
          /> : '' }
        </Stack>
          <CardContent >
            Top
          </CardContent>
          {top ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
            className="itemSliderImg"
            component="img"
            image={top.img}
            alt={top.name}
          /> : '' }
        <Stack direction="column" spacing={1} display='flex'>
          <CardContent>
            Accessory
          </CardContent>
          {accessory ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
            className="itemSliderImg"
            component="img"
            image={accessory.img} 
            alt={accessory.name}
          /> : '' }
          <CardContent>
            Bottom
          </CardContent>
          {bottom ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
            className="itemSliderImg"
            component="img"
            image={bottom.img}
            alt={bottom.name}
          /> : '' }
        </Stack>
      </Stack>
    </Card>
  );
}

export default OutfitDesignBuilder;