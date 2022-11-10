import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import BottomBar from "../BottomBar/BottomBar";

// MUI
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const favoriteOutfits = useSelector(store => store.favorites.favoriteOutfitsReducer);

    useEffect(() => {
        dispatch({
        type: 'FETCH_FAVORITE_OUTFITS'
    })
    return () => {
        dispatch({
            type: 'CLEAR_FAVORITE_OUTFITS'
        })
        }
    }, []);

    console.log('favoriteOutfits is:', favoriteOutfits);
    return (
        <>
            <p>Favorite Outfit List Page</p>

            <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                    <FavoriteOutfitItem key={outfit.id} outfit={outfit}/>
            ))}
            </Stack>
            <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
            </Paper>

        </>
    );
};
export default FavoriteOutfitList;