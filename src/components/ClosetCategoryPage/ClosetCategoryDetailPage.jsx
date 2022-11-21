// import React
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// import component
import CategoryDetailsItem from './CategoryDetailsItem';
import '../ClosetPage/ClosetPage.css';
import ClosetSearchBar from '../ClosetPage/ClosetSearchBar';
import ClosetToggleButton from '../ClosetPage/ClosetToggleButton';
import NavStack from '../Nav/NavStack';

// import material ui
import { Typography } from '@mui/material';

function ClosetCategoryDetailPage () {

    // use-params
    const params = useParams();
    const categoryName = params.name
    // console.log('what is CategoryName', CategoryName);
    // use-dispatch
    const dispatch = useDispatch();
    // use-selector
    const itemsDetails = useSelector(store => store.closetReducer.closetItemReducer)
    // console.log('what is itemsDetails', itemsDetails);

    const constraint = useSelector(store => store.closetReducer.constraint);

    useEffect(() => {

        dispatch({
            type: 'FETCH_CLOSET_ITEMS',
            payload: categoryName
        })

        return () => {
            dispatch({
                type: 'CLEAR_CLOSET_ITEMS'
            })
        }
    }, [params.name])

    return (
        <div className="paddingForBuyButton">
            <NavStack />
            <div className="closetCategoriesSearchBar">
                <ClosetSearchBar constraint={constraint} categoryName={categoryName} />
            </div>
            <Typography className='ClosetCatergoryTitle' variant='h6'>My Closet: {categoryName}</Typography>
            <ul className='outfit-ul'>
                {itemsDetails.map (items => (
                        <CategoryDetailsItem key={items.id} items={items}/>
                ))}
            </ul>
        </div>
    )
}

export default ClosetCategoryDetailPage;