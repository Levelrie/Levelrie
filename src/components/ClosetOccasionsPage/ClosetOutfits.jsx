// import React
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// import component
import ClosetOutfitList from '../ClosetPage/ClosetOutfit.jsx';

// import material ui
import { Typography } from '@mui/material';

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
            <Typography variant='h6'>My Closet: Outfits</Typography>
            <ul className='outfit-ul'>
                {closetOutfits.map(outfit => (
                    <ClosetOutfitList key={outfit.id} outfit={outfit}/>
                ))}
            </ul>
        </div>
    )
}

export default ClosetOutfits;