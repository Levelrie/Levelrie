// Import React
import { useEffect, useState  } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

// import component
import ClosetOutfitList from './ClosetOutfit.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import BottomBar from "../BottomBar/BottomBar";
import Paper from '@mui/material/Paper';
import './ClosetPage.css';


function ClosetPage () {

    // use-selector
    const closetOutfits = useSelector(store => store.closetReducer.closetOutfitsReducer);
    // console.log('what is our data:', closetOutfits)
    // use-dispatch
    const dispatch = useDispatch();
    // use-history
    const history = useHistory();
    // use-state
    const [highlightedButton, setHighlightedButton] = useState('');

    // use-effect (display outfit list on the DOM)
    useEffect(()=> {

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS'
        })

    },[]);

    // handles the toggle button. switch page view from outfits page to categories.
    const toggleButtonClicked = (e) => {
        switch(e.target.value) {
            case 'outfit':
                // No need to history.push, you're already here!
                setHighlightedButton('outfit');
                break;
            case 'category':
                history.push('/closet/categories')
                setHighlightedButton('category');
                break;
        }
    }

    return (
        <>
            <div className='outfitForm'>
            <ToggleButton toggleButtonClicked={toggleButtonClicked} highlighted={'outfit'} />
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