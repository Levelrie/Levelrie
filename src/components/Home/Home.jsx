import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";

export default function Home() {

    const dispatch = useDispatch();

    const outfitsArray = useSelector(store => store.outfits.outfits);
    const homeCounter = useSelector(store => store.outfits.counter);

    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});

        return () => {
            dispatch({type:'CLEAR_HOME_OUTFITS'});
        }
    }, []);

    const rejectOutfit = () => {
        dispatch({
            type: 'SAGA_REJECT_OUTFIT',
            payload: outfitsArray[homeCounter].id
        });
    }

    const favoriteOutfit = () => {
        dispatch({
            type: 'SAGA_FAVORITE_OUTFIT',
            payload: outfitsArray[homeCounter].id
        });
    }

    return (
        <>
            <OutfitHomeItem outfitsArray={outfitsArray} homeCounter={homeCounter}/>
            <p><button onClick={rejectOutfit}>Swipe Left</button><button onClick={favoriteOutfit}>Swipe Right</button></p>
        </>
    );
}