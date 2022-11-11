import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './ToggleButton.css';
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';


export default function ToggleButton() {

  
  console.log('RELODED?????')
  
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    switch(location.pathname) {
      case '/favorites/outfits':
        setIsFront(true);
        break;
      case '/closet/outfits':
        setIsFront(true);
        break;
      case `/favorites/items`:
        setIsFront(false);
        break;
      case '/closet/items':
        setIsFront(false);
        break;
      case `/favorites/categories`:
        setIsFront(false);
        break;
      case `/closet/categories`:
        setIsFront(false);
        break;  
    }

  }, [location]);
  
    const [isFront, setIsFront] = useState();

    const toggleButtonClicked = (e) => {
      switch(e.target.value) {
        case 'outfit':  
            if (location.pathname === '/favorites/items' || location.pathname === '/favorites/categories') {
              history.push('/favorites/outfits');
            } else if (location.pathname === '/closet/items' || location.pathname === '/closet/categories') {
              history.push('/closet/outfits');
            }
            break;
        case 'category':
            if (location.pathname === '/favorites/outfits') {
              history.push('/favorites/categories');
            } else if (location.pathname === '/closet/outfits') {
              history.push('/closet/categories');
            }
            break;
    }
    }

    const handleClick = (e) => {
      console.log('this', e.target.value);
        
      toggleButtonClicked(e);
    }

  return (
    <Stack direction='row' justifyContent='center'>
      <Button variant='contained' value='outfit' color={isFront ? 'basePink' : 'baseTan'} id='outfitButton' className={isFront ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Outfit</Button>
      <Button variant='contained' value='category' color={!isFront ? 'basePink' : 'baseTan'} id='categoryButton' className={!isFront ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Category</Button>
    </Stack>
  );
}