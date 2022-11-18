import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './FavoriteOutfitOccasions.css'

function FavoriteOutfitOccasions() {

    const history = useHistory();
    const dispatch = useDispatch();
    const occasions = useSelector(store => store.favorites.occasionsReducer)
    
    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    useEffect(()=> {
        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });
        
        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });
    
        dispatch({
            type: 'FETCH_OCCASIONS'
        })
        
        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});
          
        return () => {
            dispatch ({
                type: 'CLEAR_OCCASIONS'
            })
        }
    },[]);

    const handleClick = (e) => {
        console.log('id = ', e.target.id)
        history.push(`/favorites/outfits/${e.target.id}`);
    }

    return (
        <Box sx={{width: '100%'}} className='occasionCategoryContainer'>
        <Typography variant="h6">Faves</Typography>
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
    );
};

export default FavoriteOutfitOccasions;