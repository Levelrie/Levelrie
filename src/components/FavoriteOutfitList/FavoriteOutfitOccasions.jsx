import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './FavoriteOutfitOccasions.css'

function FavoriteOutfitOccasions() {

    const dispatch = useDispatch();
    const occasions = useSelector(store => store.favorites.occasionsReducer)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_OCCASIONS'
        })
        return () => {
            dispatch ({
              type: 'CLEAR_OCCASIONS'
            })
          }
    },[]);

    const handleClick = (e) => {
        console.log('id = ', e.target.id)
    }

    console.log('here are occasions:', occasions);
    return (
        <>
        <Box sx={{width: '100%'}}>
            <Grid container spacing={1} mt={3} mb={3} className='occasionCategoryContainer'>
                {
                occasions.map(occasion => {
                    return (
                        <Grid item xs={6} key={occasion.id}>
                            <Button id={occasion.id} sx={{borderRadius:5, fontSize:20}} className="favoriteOccasionButton" color='palePink' onClick={handleClick} variant='contained'>{occasion.name}</Button>
                        </Grid>
                    )
                })
                }
            </Grid>
        </Box>
        </>
    );
};

export default FavoriteOutfitOccasions;