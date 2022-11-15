// Import React
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

//import component 
import ClosetCategory from '../ClosetCategoryPage/ClosetCategory';

function ClosetItemPage () {

    // use-dispatch
    const dispatch = useDispatch();

    // use-selector
    const closetCategory = useSelector(store => store.categories);
    // console.log('what is our data:', closetCategory)

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_CATEGORY'
        })

    },[]);

    if (!closetCategory) {
        return null;
    }

    return (
        <div className='categoryDiv'>
            <div className='categoryTitle'>
                <Typography variant='h6'>My Closet: Category</Typography>
            </div>
            <Box className="categoryBox" sx={{width: '100%'}}>
                <Grid container spacing={1}>
                    {closetCategory && closetCategory.map (category => (
                        <ClosetCategory key={category.id} category={category}/>
                    ))}    
                </Grid>
            </Box>
        </div>
    )
} 

export default ClosetItemPage;