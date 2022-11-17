import * as React from 'react';
import '../ToggleButton/ToggleButton.css';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function ClosetToggleButton() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        });

        switch(location.pathname) {
            case '/closet/occasions':
                setIsFront(true);
                break;
            case '/closet/categories':
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
                    type: 'SET_CLOSET_SEARCH_CONSTRAINT',
                    payload: 'closetOutfits'
                });
                history.push('/closet/occasions');
                break;
            case 'category':
                // setIsFront(false);
                // setConstraint('globalItems');
                dispatch({
                    type: 'SET_CLOSET_SEARCH_CONSTRAINT',
                    payload: 'closetItems'
                });
                history.push('/closet/categories');
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