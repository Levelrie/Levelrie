import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function FavoriteOutfitOccasions() {

    const dispatch = useDispatch();
    const occasions = useSelector(store => store.favorites.occasionsReducer);

    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    useEffect(()=> {

        dispatch({
            type: 'FETCH_OCCASIONS'
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

    },[]);

    // TO DO:
    // -create route to fetch occasions
    // -create occasion reducer
    // -create occasions route
    // - subscribe to occasions reducer

    console.log('here are occasions:', occasions);
    return (
        <>
        
        {
        occasions.map(occasion => {
            return (
                <div key={occasion.id}>
                    <p>{occasion.name}</p>
                </div>
            )
        })
        }
        </>
    );
};

export default FavoriteOutfitOccasions;