// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

//import component 
import ClosetCategory from '../ClosetCategoryPage/ClosetCategory';

// import material ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function ClosetItemPage () {

    // use-dispatch
    const dispatch = useDispatch();

    // use-selector
    const closetCategory = useSelector(store => store.categories);
    // console.log('what is our data:', closetCategory)

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        })

    },[]);

    return (
        <div>
            <Container className='faveCategoriesContainer'>
            <Typography variant="h6">My Closet: Category</Typography>
                <Box sx={{width: '100%'}}>
                    <Grid container spacing={1} mt={3} mb={3}>
                    {closetCategory.map (category => (
                            <ClosetCategory key={category.id} category={category}/>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    )
} 

export default ClosetItemPage;