// Import React
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

// import component
import ClosetOutfitList from './ClosetOutfit.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import BottomBar from "../BottomBar/BottomBar";
import Paper from '@mui/material/Paper';

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
    
    const handleCategory = (e) => {
        e.preventDefault();
        history.push('/closet/categories')
    }

    return (
        <>
            <div>
                <ToggleButton />
                <button onClick={handleCategory}>Category</button>
                <SearchBar />
                <h4>My Closet: Outfits</h4>
                <ul>
                    {closetOutfits.map(outfit => (
                        <ClosetOutfitList key={outfit.id} outfit={outfit}/>
                    ))}
                </ul>
            </div>
            <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
            </Paper>
        </>
    )
} // end of ClosetPage

export default ClosetPage;