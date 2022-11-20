import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import FavoriteItemItem from '../FavoriteItemList/FavoriteItemItem';

import './FavoriteOutfitItemDetail.css';

function FavoriteOutfitItemDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    // TO DO: 
    // - SAGA STARTED IN FAVORITES.SAGA.JS BUT NEED TO CREATE ROUTE
    // - CREATE OUTFIT DETAILS REDUCER
    // - THERE IS NO REDUCER YET SO UPDATE THE BELOW STORE WHERE IT'S PULLING FROM
    // - RENDER THOSE ITEMS ON THE DOM USING ITEM ITEM

    // THINGS I STARTED BELOW:
    // const favoriteOutfitDetailsItem = useSelector(store => store.favorites.favoriteOutfitsReducer);

    let sizes = useSelector(store => store.favorites.sizes);
    let colors = useSelector(store => store.favorites.colors);
    let item = useSelector(store => store.favorites.specificItem);

    useEffect(() => {
        const itemToPull = params.itemId;
        const itemToPullOutfitId = params.outfitId;
        dispatch({
            type: 'SAGA_FETCH_FAVORITE_ITEM_FOR_OUTFIT_DETAILS',
            payload: {outfitId: itemToPullOutfitId, itemId: itemToPull}
        })
        return () => {
            dispatch({
                type: 'CLEAR_FAVORITE_ITEM_FOR_OUTFIT_DETAILS'
            });
        }
    }, [params.itemId]);

    return (
        <div className="favoriteOutfitItemDetailsPage">
            {/* <p>FavoriteOutfitItemDetail</p> */}
            {/* // Category won't be used here, so we can set it to zero */}
            <FavoriteItemItem item={item} category={item.category_id} sizes={sizes} colors={colors} inItemDetails={true}/>
        </div>
    )
}

export default FavoriteOutfitItemDetail;