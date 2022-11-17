// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

// import component
import ClosetOutfitList from './ClosetOutfit.jsx';
import ClosetSearchBar from './ClosetSearchBar.jsx';
import './ClosetPage.css';

// import material ui
import { Typography } from '@mui/material';

function ClosetPage () {

    // use-selector
    const closetOutfits = useSelector(store => store.closetReducer.closetOutfitsReducer);
    // console.log('what is our data:', closetOutfits)

    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const constraint = useSelector(store => store.closetReducer.constraint);
    const categories = useSelector(store => store.closetReducer.categories);

    // const searchResults = useSelector(store => store.closetReducer.searchResults);

    // use-dispatch
    const dispatch = useDispatch();

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });

        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS'
        });

        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

    },[]);

    //use-history
    const history = useHistory();
    
    return (
        <>
            <div className='outfitForm'>
                <ClosetSearchBar constraint={constraint} categories={categories} />
                <Typography variant='h6'>My Closet: Outfits</Typography>
                <ul className='outfit-ul'>
                    {closetOutfits.map(outfit => (
                        <ClosetOutfitList key={outfit.id} outfit={outfit}/>
                    ))}
                </ul>
            </div>
        </>
    )
} // end of ClosetPage

export default ClosetPage;