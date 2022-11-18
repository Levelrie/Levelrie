// import React
import { useHistory } from 'react-router-dom'

// import material ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ClosetCategoryOccasions ({occasion}) {
     // use-history
     const history = useHistory()

     // handle the outfit detail click
     const handleDetailsClick = () => {
         history.push(`/closet/${occasion.name}/outfits`)
         window.location.reload(); 
         // this is to hard refresh page, will probably find a better way to refresh page in the future.
     }
    return (
        <Grid key={occasion.id} item xs={6}>
            <Button 
                id={occasion.name} 
                sx={{borderRadius:5, fontSize:20}} 
                className="categoryButton" 
                color='palePink'  
                variant='contained'
                onClick={handleDetailsClick}
                >
                    {occasion.name}
            </Button>
        </Grid>
    )
}

export default ClosetCategoryOccasions;
