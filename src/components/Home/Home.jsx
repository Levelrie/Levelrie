import * as React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomeOutfitCards from "./HomeOutfitCards";
import './Home.css'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
        <Tooltip title="Swipe LEFT to see a new outfit. Swipe RIGHT to save the outfit to favorites" open={open} onClose={handleClose} onOpen={handleOpen}>
        <div className="swipeCardContainer">
            <HomeOutfitCards rejectionFits={rejectionFits} favoriteFits={favoriteFits} outfitsArray={outfitsArray} />
        </div>        
        </Tooltip>
    );
}