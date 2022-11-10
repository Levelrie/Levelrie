import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteItemItem from "./FavoriteItemItem";
import BottomBar from "../BottomBar/BottomBar";

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
        <>
        <Typography variant="h6">Faves</Typography>
        <Stack spacing={2}>
            {favoriteItems.map(item => (
                    <FavoriteItemItem key={item.id} item={item}/>
            ))}
        </Stack>
        <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
        </Paper>
        </>
    )
}

export default FavoriteItemList;