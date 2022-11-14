import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function OutfitDesignBuilder() {

  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);

  return (
    <Card sx={{ height: '45vh', margin: 1, padding: 1, backgroundColor: "#F2DCF2", }}>
      <Stack direction="row" spacing={10}  width='100%' >
        <Stack direction="column" spacing={15} display='flex'>
          <CardContent>
            Outerwear
            {outerwear ? outerwear.img : '' }
          </CardContent>
          <CardContent>
            Footwear
            {footwear ? footwear.img : '' }
          </CardContent>
        </Stack>
          <CardContent sx={{ pt: '25%'}}>
            Top
            {top ? top.img : '' }
          </CardContent>
        <Stack direction="column" spacing={15} display='flex'>
          <CardContent>
            Accessory
            {accessory ? accessory.img : '' }
          </CardContent>
          <CardContent>
            Bottom
            {bottom ? bottom.img : '' }
          </CardContent>
        </Stack>
      </Stack>
    </Card>
  );
}

export default OutfitDesignBuilder;