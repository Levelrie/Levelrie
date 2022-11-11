import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './ToggleButton.css'


export default function ToggleButton({toggleButtonClicked, highlighted}) {

    const handleClick = (e) => {
      console.log('this', e.target.value)
        
      toggleButtonClicked(e);
    }

  return (
    <Stack direction='row' justifyContent='center'>
      <Button variant='contained' value='outfit' color={highlighted === 'outfit' ? 'basePink' : 'baseTan'} id='outfitButton' className={highlighted === 'outfit' ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={handleClick}>Outfit</Button>
      <Button variant='contained' value='category' color={highlighted === 'category' ? 'basePink' : 'baseTan'} id='categoryButton' className={highlighted === 'category'  ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={handleClick}>Category</Button>
    </Stack>
  );
}