import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoriteOutfitItem from './FavoriteOutfitItem';
import './FavoriteOutfitList.css';
import FavoriteSearchBar from './FavoriteSearchBar';

// MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function FavoriteOutfitList() {
    const dispatch = useDispatch();
    const params = useParams();
    const favoriteOutfits = useSelector(store => store.favorites.favoriteOutfitsForOccasionReducer);

    // moved the following 2 to FavoriteOutfitOccasions
    // const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    // const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const constraint = useSelector(store => store.favorites.constraint);
    const occasionId = params.id
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
            type: 'FETCH_FAVORITE_OUTFITS_FOR_OCCASION',
            payload: occasionId
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
                type: 'CLEAR_FAVORITE_OUTFITS_FOR_OCCASION'
            });
        }
    }, []);

    return (
        <>
        <div className="outfitsListSearchBar">
             <FavoriteSearchBar constraint={constraint} />
        </div>
        <Typography className='faveOutfitListTitle' variant='h6'>Faves</Typography>
        <Stack spacing={2}>
            {favoriteOutfits.map(outfit => (
                <div className='faveOutfitCard' key={outfit.id}>
                     <FavoriteOutfitItem key={outfit.id} outfit={outfit} occasionId={occasionId}/>
                </div>
            ))}
        </Stack>       
        </>
    );
};
export default FavoriteOutfitList;