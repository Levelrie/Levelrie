import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomeOutfitCards from "./HomeOutfitCards";
import './Home.css';

// MUI
import SwipeRightTwoToneIcon from '@mui/icons-material/SwipeRightTwoTone';
import SwipeLeftTwoToneIcon from '@mui/icons-material/SwipeLeftTwoTone';
import TouchAppTwoToneIcon from '@mui/icons-material/TouchAppTwoTone';

export default function Home() {
    const dispatch = useDispatch();
    
    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const outfitsArray = useSelector(store => store.outfits.fits);

    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});
    return () => {
        dispatch({type:'CLEAR_HOME_OUTFITS'});
    }
}, []);

    return (
        <div className="swipeCardContainer">
            <HomeOutfitCards rejectionFits={rejectionFits} favoriteFits={favoriteFits} outfitsArray={outfitsArray} />
            <div className='homeOrientation'>
                <div className='orientationRightDiv'>
                    <p className='orientationP'>Love an outfit?</p>
                    <SwipeRightTwoToneIcon className='rightIcon' sx={{ fontSize: 40 }} />
                    <p className='orientationP'>Swipe right!</p>
                </div>
                <div className='orientationLeftDiv'>
                    <p className='orientationP'>Not crazy about an outfit?</p>
                    <SwipeLeftTwoToneIcon className='leftIcon' sx={{ fontSize: 40 }} />
                    <p className='orientationP'>Swipe left!</p>
                </div>
                <div className='orientationFaveDiv'>
                    <p className='orientationP'>Love an item in an outfit?</p>
                    <TouchAppTwoToneIcon className='touchIcon' sx={{ fontSize: 40 }} />
                    <p className='orientationP'>Tap the heart icon!</p>
                </div>
            </div>
        </div>             
    );
}