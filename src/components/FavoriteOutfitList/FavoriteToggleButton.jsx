import * as React from 'react';
import '../ToggleButton/ToggleButton.css';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function FavoriteToggleButton() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        });

        switch(location.pathname) {
            case '/favorites/outfits':
                setIsFront(true);
                break;
            case '/favorites/outfits/1':
                setIsFront(true);
                break;
            case '/favorites/outfits/2':
                setIsFront(true);
                break;
            case '/favorites/outfits/3':
                setIsFront(true);
                break;
            case '/favorites/outfits/4':
                setIsFront(true);
                break;
            case '/favorites/outfits/5':
                setIsFront(true);
                break;                
            case '/favorites/outfitoccasions':
                setIsFront(true);
                break;
            case '/favorites/categories':
                setIsFront(false);
                break;
            default:
                setIsFront(false);
                break;
        }

    }, []);
  
    // Handles button highlighting
    const [isFront, setIsFront] = useState();

    const handleClick = (e) => {
        console.log('this', e.target.value);

        switch(e.target.value) {
            case 'outfit':
                // setIsFront(true);
                // setConstraint('globalOutfits')
                dispatch({
                    type: 'SET_FAVORITES_SEARCH_CONSTRAINT',
                    payload: 'favoriteOutfits'
                });
                history.push('/favorites/outfits');
                break;
            case 'category':
                // setIsFront(false);
                // setConstraint('globalItems');
                dispatch({
                    type: 'SET_FAVORITES_SEARCH_CONSTRAINT',
                    payload: 'favoriteItems'
                });
                history.push('/favorites/categories');
                break;
        }

    }

  return (
    <div className="searchToggle">
        <Stack direction='row' justifyContent='center'>
            <Button variant='contained' 
                value='outfit' 
                color={isFront ? 'basePink' : 'baseTan'} 
                id='outfitButton' 
                className={isFront ? 'frontButton' : ''} 
                sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} 
                onClick={(e) => handleClick(e)}
            >
                Outfit
            </Button>
            <Button variant='contained' 
                value='category' 
                color={!isFront ? 'basePink' : 'baseTan'} 
                id='categoryButton' 
                className={!isFront ? 'frontButton' : ''} 
                sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} 
                onClick={(e) => handleClick(e)}
            >
                Category
            </Button>
        </Stack>
    </div>
  );
}