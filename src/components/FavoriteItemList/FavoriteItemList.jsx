import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoriteItemItem from "./FavoriteItemItem";
import './FavoriteItemList.css';

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function FavoriteItemList() {
    const dispatch = useDispatch();
    const params = useParams();
    const favoriteItems = useSelector(store => store.favorites.favoriteItemsReducer);

    useEffect(() => {
        const category = params.id
        dispatch({
            type: 'FETCH_FAVORITE_ITEMS',
            payload: category
        })
        return () => {
            dispatch({
            type: 'CLEAR_FAVORITE_ITEMS'
            })
        }
    }, [params.id]);

    // const toggleButtonClicked = (e) => {
    //     console.log('PASSED???', e.target.value);

    //     switch(e.target.value) {
    //         case 'outfit':
    //             history.push('/favorites/outfits')
    //             setHighlightedButton('outfit');
    //             break;
    //         case 'category':
    //             // No need to history.push, you're already here!
    //             setHighlightedButton('category');
    //             break;
    //     }
    // }

    console.log('favoriteItems is:', favoriteItems);
    return (
        <>
            <Container className='favoriteItemListContainer'>
            <Typography variant="h6">Faves</Typography>
            <Stack spacing={2}>
                {favoriteItems.map(item => (
                        <FavoriteItemItem key={item.id} item={item}/>
                ))}
            </Stack>
            </Container>
        </>
    )
}

export default FavoriteItemList;