import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import TinderCard from 'react-tinder-card'

import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";
import BottomBar from "../BottomBar/BottomBar";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import './Home.css'

export default function Home() {
    const dispatch = useDispatch();

    const outfitsArray = useSelector(store => store.outfits.outfits);


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

    console.log('outfitsArray is:', outfitsArray)
    return (
        <>
            <Container maxWidth="lg">
            <div className="stack">
                {outfitsArray.map((outfit) => {
                    return (
                        <TinderCard key={outfit.id}
                                    className="outfitHomeBox"
                                    onSwipe={(direction) => onSwipe(direction, outfit.id)}
                                    preventSwipe={['up', 'down']}
                                    >
                                            <OutfitHomeItem outfit={outfit}/>
                        </TinderCard>
                    );
                })}
            </div>
            </Container>
            <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
            </Paper>
        </>
    );
}