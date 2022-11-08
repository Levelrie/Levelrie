import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './ToggleButton.css'
import { useState } from 'react'


export default function ToggleButton() {
  const [isFront, setIsFront] = useState(true)

    const handleClick = (e) => {
      console.log('this', e.currentTarget)
        setIsFront(current => !current)  
    }

  return (
    <Stack direction='row' justifyContent='center'>
      <Button variant='contained' color='baseTan' id='outfitButton' className={isFront ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={handleClick}>Outfit</Button>
      <Button  variant='contained' color='basePink' id='categoryButton' className={!isFront ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={handleClick}>Category</Button>
    </Stack>
  );
}