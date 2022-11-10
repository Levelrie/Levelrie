import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteItemItem from "./FavoriteItemItem";

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function FavoriteItemList({category}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const favoriteItems = useSelector(store => store.favorites.favoriteItemsReducer);


    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITE_ITEMS',
            payload: {category}
        })
        return () => {
            dispatch({
            type: 'CLEAR_FAVORITE_ITEMS'
            })
        }
    }, []);

    console.log('favoriteItems is:', favoriteItems);

    return (
        <Container>
        <Typography variant="h6">Faves</Typography>
        <Stack spacing={2}>
            {favoriteItems.map(item => (
                    <FavoriteItemItem key={item.id} item={item}/>
            ))}
        </Stack>
        </Container>
    )
}

export default FavoriteItemList;