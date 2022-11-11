import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import TinderCard from 'react-tinder-card'

import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";

import './Home.css'

export default function Home() {
    const dispatch = useDispatch();

    const outfitsArray = useSelector(store => store.outfits.outfits);
    const counter = useSelector(store => store.outfits.counter);


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});
    return () => {
        dispatch({type:'CLEAR_HOME_OUTFITS'});
    }
}, []);
const rejectOutfit = (id) => {
    dispatch({
        type: 'SAGA_REJECT_OUTFIT',
        payload: id
    });
}
const favoriteOutfit = (id) => {
    dispatch({
        type: 'SAGA_FAVORITE_OUTFIT',
        payload: id
    });
}
// Fix multiple table entry bug
    const onSwipe = (direction, outfitId) => {
        // Direction is a string

        let id = outfitId;

        if (direction === 'left') {
            rejectOutfit(id);
        } else if (direction === 'right') {
            favoriteOutfit(id);
        }

    };

    return (
        <>
            <div className="stack">
                {outfitsArray.map((outfit) => {

                    return (

                        <TinderCard key={outfit.id}
                                    className="outfitHomeBox"
                                    onSwipe={(direction) => onSwipe(direction, outfit.id)}
                                    preventSwipe={['up', 'down']}
                                    >
                                <OutfitHomeItem outfit={outfit}/>
                                <p><button onClick={rejectOutfit}>Swipe Left</button><button onClick={favoriteOutfit}>Swipe Right</button></p>

                        </TinderCard>


                    );
                })}
            </div>
        </>
    );
}