import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomeOutfitCards from "./HomeOutfitCards";
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();

    const outfitsArray = useSelector(store => store.outfits.outfits);
    // const counter = useSelector(store => store.outfits.counter);


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});
    return () => {
        dispatch({type:'CLEAR_HOME_OUTFITS'});
    }
}, []);

    console.log('outfitsArray is:', outfitsArray)
    return (
        <>
        <div className="swipeCardContainer">
            <HomeOutfitCards outfitsArray={outfitsArray}/>
        </div>        
        </>
    );
}