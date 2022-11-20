// import React
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// import component
import ClosetOutfitList from '../ClosetPage/ClosetOutfit.jsx';
import NavStack from '../Nav/NavStack.jsx';

// import material ui
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

function ClosetOutfits () {
    // use-params
    const params = useParams();
    const occasionsName = params.name
    // console.log('what is occasionsName', occasionsName);
    // use-dispatch
    const dispatch = useDispatch();

    // use-selector
    const closetOutfits = useSelector(store => store.closetReducer.closetOutfitsReducer);
    // console.log('what is our data:', closetOutfits)

    useEffect(() => {

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS',
            payload: occasionsName
        })

        return () => {
            dispatch({
                type: 'CLEAR_CLOSET_ITEMS'
            })
        }
    }, [params.name])

    return (
        <div className='outfitForm'>
            <NavStack />
            <Typography variant='h6'>My Closet: Outfits</Typography>
            <Stack spacing={2}>
                {closetOutfits.map(outfit => (
                    <div className='faveOutfitCard' key={outfit.id}>
                        <ClosetOutfitList outfit={outfit}/>
                    </div>    
                ))}

            </Stack>

        </div>
    )
}

export default ClosetOutfits;