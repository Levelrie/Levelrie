import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function FavoriteOutfitItemDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    // TO DO: 
    // - SAGA STARTED IN FAVORITES.SAGA.JS BUT NEED TO CREATE ROUTE
    // - CREATE OUTFIT DETAILS REDUCER
    // - THERE IS NO REDUCER YET SO UPDATE THE BELOW STORE WHERE IT'S PULLING FROM
    // - RENDER THOSE ITEMS ON THE DOM USING ITEM ITEM

    // THINGS I STARTED BELOW:
    // const favoriteOutfitDetails = useSelector(store => store.favorites.favoriteOutfitsReducer);
    // useEffect(() => {
    //     const outfitToPull = params.id
    //     dispatch({
    //         type: 'FETCH_FAVORITE_OUTFIT_DETAILS',
    //         payload: outfitToPull
    //     })
    //     return () => {
    //         dispatch({
    //         type: 'CLEAR_FAVORITE_OUTFIT_DETAILS'
    //         })
    //     }
    // }, [params.id]);

    return (
        <p>FavoriteOutfitItemDetail</p>
    )
}

export default FavoriteOutfitItemDetail;