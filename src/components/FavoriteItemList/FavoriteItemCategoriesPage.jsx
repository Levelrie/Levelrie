import { useHistory } from 'react-router-dom';
import * as React from 'react';
import './FavoriteItemCategoriesPage.css';
// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

 function FavoriteItemCategoriesPage() {
    const history = useHistory();

    const handleClick = (e) => {
        console.log('id = ', e.target.id);
        history.push(`/favorites/categories/${e.target.id}`);
    }
     return (
         <>
         <Stack>
         <Typography variant="h6">Faves</Typography>
         </Stack>
         <Box sx={{width: '100%'}}>
            <Grid container spacing={1} mt={3} mb={3}>
                <Grid item xs={6}>
                    <Button id='top' sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Tops</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button id='bottom' sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Bottoms</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button id='footwear'sx={{borderRadius:5, fontSize:20}}  className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Footwear</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button id='outwear' sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Outerwear</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button id='hat' sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Hats</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button id='accessories' sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' onClick={handleClick} variant='contained'>Accessories</Button>
                </Grid>
            </Grid>
        </Box>
         </>
     );
 };

 export default FavoriteItemCategoriesPage;