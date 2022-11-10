import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteItemItem from "./FavoriteItemItem";

// MUI
import Stack from '@mui/material/Stack';

function FavoriteItemList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const favoriteItems = useSelector(store => store.favorites.favoriteItemsReducer);



    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITE_ITEMS',
        })
        return () => {
            dispatch({
              type: 'CLEAR_FAVORITE_ITEMS'
            })
          }
    }, []);

    console.log('favoriteItems is:', favoriteItems);

    return (
        <>
        <p>Favorite Item List</p>
        <Stack spacing={2}>
            {favoriteItems.map(item => (
                    <FavoriteItemItem key={item.id} item={item}/>
            ))}
        </Stack>
        </>
    )
}

export default FavoriteItemList;