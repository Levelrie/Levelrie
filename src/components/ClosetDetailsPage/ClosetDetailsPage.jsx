// import React
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

//import component
import ClosetDetailsItems from './ClosetDetailsItems';
import { Typography } from '@mui/material';

function ClosetDetailsPage () {
    // use-params
    const params = useParams();
    // use-dispatch
    const dispatch = useDispatch();
    // use-selector
    const outfitDetails = useSelector(store => store.closetReducer.closetOutfitDetailsReducer)
    console.log('what is outfitDetails', outfitDetails);
    const outfitItems = outfitDetails.items;
    console.log('what is outfitItems', outfitItems);
    const outfitId = params.id
    // console.log('what is outfitId', outfitId);

    useEffect(() => {

        dispatch({
            type: 'FETCH_CLOSET_OUTFIT_DETAILS',
            payload: outfitId
        })

        return () => {
            dispatch({
                type: 'CLEAR_OUTFIT_DETAILS'
            })
        }
    }, [params.id])

    if (!outfitItems) {
        return null;
    }

    return (
        <div className="closetItemList">
            <Typography className='ClosetTitle' variant='h6'>My Closet: Outfit Details</Typography>
            {/* <Typography variant='h6'>{outfitDetails.name}</Typography>
            <Typography variant='h6'>{outfitDetails.description}</Typography> */}
            <ul className='outfit-ul'>
                {outfitItems && outfitItems.map (items => (
                    <ClosetDetailsItems key={items.f1.id} items={items}/>
                ))}
            </ul>
        </div>
    )
}

export default ClosetDetailsPage;