import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function FavoriteOutfitOccasions() {

    const dispatch = useDispatch();
    const occasions = useSelector(store => store.favorites.occasionsReducer)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_OCCASIONS'
        })

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