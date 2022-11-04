import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function ToggleButton() {
    const inFront = 1

  return (
    <Stack direction='row' justifyContent='center'>
      <Button variant='contained' color='baseTan' sx={{borderRadius: 3 , zIndex: inFront , width: 120, left: 10}}>Outfit</Button>
      <Button  variant='contained' color='basePink' sx={{borderRadius: 3, zIndex: -inFront, width: 120, right: 10}}>Category</Button>
    </Stack>
  );
}
