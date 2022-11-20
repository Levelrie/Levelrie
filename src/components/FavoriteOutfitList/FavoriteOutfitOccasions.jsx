import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
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
        <Container className='faveCategoriesContainer'>
        <Stack>
        <Typography variant="h6"></Typography>
        </Stack>
        <Box sx={{width: '100%'}}>
           <Grid container spacing={1} mt={3} mb={3}>
               {occasions.map((category) => {
                   return (
                       <Grid key={category.id} item xs={6}>
                           <Button id={category.id} sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>{category.name}</Button>
                       </Grid>
                   );
               })}
           </Grid>
       </Box>
        </Container>
    );
};

export default FavoriteOutfitOccasions;