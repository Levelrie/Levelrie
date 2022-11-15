import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';

// MUI
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    const user = useSelector((store) => store.user);
    const favoriteOutfits = useSelector(store => store.favorites.favoriteOutfitsReducer);

    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const [highlightedButton, setHighlightedButton] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITE_OUTFITS'
        });

        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });

        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });

        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

        // switch(location.pathname) {
        //     case '/favorites/outfits':
        //         setHighlightedButton('outfit');
        //         break;
        //     case  '/favorites/items':
        //         setHighlightedButton('category');
        //         break;
        // }

        return () => {
            dispatch({
                type: 'CLEAR_FAVORITE_OUTFITS'
            });
        }
    }, []);

    const toggleButtonClicked = (e) => {
        console.log('PASSED???', e.target.value);

        switch(e.target.value) {
            case 'outfit':
                // No need to history.push, you're already here!
                setHighlightedButton('outfit');
                break;
            case 'category':
                history.push('/favorites/items')
                setHighlightedButton('category');
                break;
        }

    }

    console.log('favoriteOutfits is:', favoriteOutfits);
    return (
        <>
            {/* <p>Favorite Outfit List Page</p> */} 

            <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                    <FavoriteOutfitItem key={outfit.id} outfit={outfit}/>
            ))}
            </Stack>

        </>
    );
};
export default FavoriteOutfitList;