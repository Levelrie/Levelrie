import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import './FavoriteOutfitList.css';

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

    const [highlightedButton, setHighlightedButton] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_FAVORITE_OUTFITS'
        });

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
            <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                <div className='faveOutfitCard'>
                     <FavoriteOutfitItem key={outfit.id} outfit={outfit}/>
                </div>
            ))}
            </Stack>

        </>
    );
};
export default FavoriteOutfitList;