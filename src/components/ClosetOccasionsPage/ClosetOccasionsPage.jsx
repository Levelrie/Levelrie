// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import component
import '../ClosetPage/ClosetPage.css';
import ClosetCategoryOccasions from './ClosetOccasions';

// import material ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function ClosetOccasion () {
    const history = useHistory();
    // use-dispatch
    const dispatch = useDispatch();
    // use-selector
    const closetOccasion = useSelector(store => store.occasions);
    // console.log('what is our data:', closetOccasion)

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_OCCASIONS'
        })

    },[]);
 
    return (
        <div className="closetOccasionsPage">
            <Container className='faveCategoriesContainer'>
            <Typography variant="h6">My Closet: Occasion Outfits</Typography>
                <Box sx={{width: '100%'}}>
                    <Grid container spacing={1} mt={3} mb={3}>
                    {closetOccasion.map (occasion => (
                            <ClosetCategoryOccasions key={occasion.id} occasion={occasion}/>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default ClosetOccasion;