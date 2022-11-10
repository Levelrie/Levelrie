// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

// import component
import ClosetOutfitList from './ClosetOutfit.jsx'

function ClosetPage () {

    // use-selector
    const closetOutfits = useSelector(store => store.closetReducer.closetOutfitsReducer);
    // console.log('what is our data:', closetOutfits)

    // use-dispatch
    const dispatch = useDispatch();

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS'
        })

    },[]);

    return (
        <div>
            <h1>this is the closet Page</h1>
            <ul>
                {closetOutfits.map(outfit => (
                    <ClosetOutfitList key={outfit.id} outfit={outfit}/>
                ))}
            </ul>
        </div>
    )
} // end of ClosetPage

export default ClosetPage;