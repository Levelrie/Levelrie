import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function OutfitDesignDetails() {

  const [addOutfit, setAddOutfit] = useState(true);

  return (
    <Card sx={{ height: '40vh', margin: 1, padding: 1, mb: 0, backgroundColor: "#BFA78A", }}>
      OUTFIT Details SECTION
      <Stack direction="column" spacing={2} display='flex'>
        <Stack alignSelf='center' direction="row" spacing={4}>
          <Button variant="contained" onClick={(event) => {setAddOutfit(true)}} color={addOutfit ? 'primary' : 'baseTan' } >Add</Button>
          <Button variant="contained" onClick={(event) => {setAddOutfit(false)}} color={addOutfit ? 'baseTan' : 'primary' }>Edit</Button>
        </Stack>
        <Box>
          
        </Box>
      </Stack>
    </Card>
  );
}

export default OutfitDesignDetails;