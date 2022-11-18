import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import './FavoriteItemCategoriesPage.css';
// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

 function FavoriteItemCategoriesPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        })

    },[]);

    const favoriteCategory = useSelector(store => store.categories);

    const handleClick = (e) => {
        console.log('id = ', e.target.id);
        history.push(`/favorites/categories/${e.target.id}`);
    }

    console.log('@@@@@@@@@ here are categories:', favoriteCategory);
     return (
         <Container className='faveCategoriesContainer'>
         <Stack>
         <Typography variant="h6">Faves</Typography>
         </Stack>
         <Box sx={{width: '100%'}}>
            <Grid container spacing={1} mt={3} mb={3}>
                {favoriteCategory.map((category) => {
                    return (
                        <Grid key={category.id} item xs={6}>
                            <Button id={category.name} sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>{category.name}</Button>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
         </Container>
     );
 };

 export default FavoriteItemCategoriesPage;