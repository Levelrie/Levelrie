// import React
import { useHistory } from 'react-router-dom'

// import material ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ClosetCategory ({category}) {

    // use-history
    const history = useHistory()

    // handle the outfit detail click
    const handleDetailsClick = () => {
        history.push(`/closet/categories/${category.name}`)
        console.log('outfit clicked', 'id', category.id, 'category', category.name);
    }

    return (
        <Grid key={category.id} item xs={6}>
                <Button 
                    sx={{borderRadius:5, fontSize:20}} 
                    className="categoryButton" 
                    color='palePink' 
                    onClick={handleDetailsClick} 
                    variant='contained'
                >
                    {category.name}
                </Button>
        </Grid>
    )
}

export default ClosetCategory;