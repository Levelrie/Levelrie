import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './CategoryButtons.css'


export default function CategoryButtons() {

    return(
        <Box sx={{width: '100%'}}>
            <Grid container spacing={1} mt={3} mb={3}>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' variant='contained'>Shoes</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' variant='contained'>Tops</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}}  className="categoryButton" color='palePink' variant='contained'>Bottoms</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' variant='contained'>Dresses</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' variant='contained'>Hats</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{borderRadius:5, fontSize:20}} className="categoryButton" color='palePink' variant='contained'>Accessories</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

