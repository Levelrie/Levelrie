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
    <Card sx={{ height: '45vh', margin: 1, padding: 1, backgroundColor: "#F2DCF2", display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>

          {outerwear ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '20vh', maxWidth: '20vh', zIndex: '1', gridColumn: '2/span3', gridRow: '2/span4'}}
            className="outerwear"
            component="img"
            image={outerwear.img}
            alt={outerwear.name}
          /> : '' }

          {top ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '16vh', maxWidth: '20vh', zIndex: '2', gridColumn: '5/span3', gridRow: '5/span4'}}
            className="top"
            component="img"
            image={top.img}
            alt={top.name}
            /> : '' }

          {accessory ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '10vh', maxWidth: '10vw', zIndex: '4', gridColumn: '8/span1', gridRow: '3/span2'}}
            className="accessory"
            component="img"
            image={accessory.img} 
            alt={accessory.name}
            /> : '' }

          {bottom ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '25vh', maxWidth: '10vw', zIndex: '3', gridColumn: '8/span3', gridRow: '7/span4'}}
            className="bottom"
            component="img"
            image={bottom.img}
            alt={bottom.name}
            /> : '' }

          {footwear ? <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '15vh', maxWidth: '10vh', zIndex: '5', gridColumn: '3/span1', gridRow: '8/span2'}}
            className="footwear"
            component="img"
            image={footwear.img}
            alt={footwear.name}
          /> : '' }

    </Card>
  );
}

export default OutfitDesignBuilder;










// {outerwear ? <CardMedia
//   sx={{ objectFit: 'contain', maxHeight: '20vh', mt: '30px', ml: '-100px', zIndex: '1'}}
//   className="outerwear"
//   component="img"
//   image={outerwear.img}
//   alt={outerwear.name}
// /> : '' }
// {top ? <CardMedia
//   sx={{ objectFit: 'contain', maxHeight: '16vh', mt: '-100px', zIndex: '3'}}
//   className="top"
//   component="img"
//   image={top.img}
//   alt={top.name}
//   /> : '' }
// {accessory ? <CardMedia
//   sx={{ objectFit: 'contain', maxHeight: '5vh', maxWidth: '5vw', mr: '-100'}}
//   className="accessory"
//   component="img"
//   image={accessory.img} 
//   alt={accessory.name}
//   /> : '' }
// {bottom ? <CardMedia
//   sx={{ objectFit: 'contain', maxWidth: '10vw', mb:'500px', float: 'right', zIndex: '5'}}
//   className="bottom"
//   component="img"
//   image={bottom.img}
//   alt={bottom.name}
//   /> : '' }
// {footwear ? <CardMedia
//   sx={{ objectFit: 'contain', maxHeight: '10vh', maxWidth: '5vh'}}
//   className="footwear"
//   component="img"
//   image={footwear.img}
//   alt={footwear.name}
// /> : '' }