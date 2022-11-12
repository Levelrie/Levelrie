// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

// import component
import ClosetOutfitList from './ClosetOutfit.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './ClosetPage.css';

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

    //use-history
    const history = useHistory();
    
    return (
        <>
            <div className='outfitForm'>
                <SearchBar />
                <h4>My Closet: Outfits</h4>
                <ul className='outfit-ul'>
                    {closetOutfits.map(outfit => (
                        <ClosetOutfitList key={outfit.id} outfit={outfit}/>
                    ))}
                </ul>
            </div>
        </>
    )
} // end of ClosetPage

export default ClosetPage;