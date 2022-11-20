import * as React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomeOutfitCards from "./HomeOutfitCards";
import './Home.css';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SwipeRightTwoToneIcon from '@mui/icons-material/SwipeRightTwoTone';
import SwipeLeftTwoToneIcon from '@mui/icons-material/SwipeLeftTwoTone';
import TouchAppTwoToneIcon from '@mui/icons-material/TouchAppTwoTone';

export default function Home() {
    const dispatch = useDispatch();
    
    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    const outfitsArray = useSelector(store => store.outfits.fits);
    // const swipeFit = useSelector(store => store.outfits.frontFit);
    // const counter = useSelector(store => store.outfits.counter);


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});
    return () => {
        dispatch({type:'CLEAR_HOME_OUTFITS'});
    }
}, []);

    // tool tips:
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

    return (
        <div>
        {/* <Tooltip title="Swipe LEFT to see a new outfit. Swipe RIGHT to save the outfit to favorites" open={open} onClose={handleClose} onOpen={handleOpen}> */}
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
        {/* </Tooltip> */}
        
        </div>
    );
}