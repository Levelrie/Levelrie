import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import './FavoriteOutfitList.css';
import FavoriteSearchBar from './FavoriteSearchBar';

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const favoriteOutfits = useSelector(store => store.favorites.favoriteOutfitsReducer);

    // moved the following 2 to FavoriteOutfitOccasions
    // const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    // const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const constraint = useSelector(store => store.favorites.constraint);

    useEffect(() => {
        
        // moved the following to FavoriteOutfitOccasions
        // dispatch({
        //     type: 'SAGA_FAVORITE_OUTFITS',
        //     payload: favoriteFits
        // });
        
        // dispatch({
        //     type: 'SAGA_REJECT_OUTFITS',
        //     payload: rejectionFits
        // });
        
        dispatch({
            type: 'FETCH_FAVORITE_OUTFITS'
        });
        // also moved the following 2 dispatches to FavoriteOutfitOccasions
        // dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        // dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

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

    console.log('favoriteOutfits is:', favoriteOutfits);
    return (
        <>
        <div className="outfitsListSearchBar">
             <FavoriteSearchBar constraint={constraint} />
        </div>
        <Typography className='faveOutfitListTitle' variant='h6'>Faves</Typography>
        <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                <div className='faveOutfitCard' key={outfit.id}>
                     <FavoriteOutfitItem key={outfit.id} outfit={outfit}/>
                </div>
            ))}
        </Stack>       
        </>
    );
};
export default FavoriteOutfitList;