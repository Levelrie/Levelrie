import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoriteItemItem from "./FavoriteItemItem";
import FavoriteSearchBar from '../FavoriteOutfitList/FavoriteSearchBar';
import './FavoriteItemList.css';

import NavStack from '../Nav/NavStack';

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function FavoriteItemList() {
    const dispatch = useDispatch();
    const params = useParams();
    const favoriteItems = useSelector(store => store.favorites.favoriteItemsReducer);

    const constraint = useSelector(store => store.favorites.constraint);

    let sizes = useSelector(store => store.favorites.sizes);
    let colors = useSelector(store => store.favorites.colors);
    
    const category = params.id
    useEffect(() => {
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

    // Filters for repeats
    colors = colors.filter((color, index) => {
        const _color = JSON.stringify(color);
        return index === colors.findIndex(obj => {
            return JSON.stringify(obj) === _color;
        });
    });

    sizes = sizes.filter((color, index) => {
        const _color = JSON.stringify(color);
        return index === sizes.findIndex(obj => {
            return JSON.stringify(obj) === _color;
        });
    });


    console.log('favoriteItems is:', favoriteItems);
    return (
        <>
        <NavStack />
        <Container className='favoriteItemListContainer'>
        <FavoriteSearchBar constraint={constraint} categoryName={category} />
            <Typography variant="h6">{category}</Typography>
            <Stack spacing={2}>
                {favoriteItems.map(item => (
                        <FavoriteItemItem key={item.id} item={item} category={category} sizes={sizes} colors={colors}/>
                ))}
            </Stack>
        </Container>
        
        </>
    )
}

export default FavoriteItemList;