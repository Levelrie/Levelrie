// Import React
import { useEffect, useState  } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

// import component 
import CategoryButtons from '../CategoryButtons/CategoryButtons'
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import BottomBar from "../BottomBar/BottomBar";
import Paper from '@mui/material/Paper';
import SearchBar from '../SearchBar/SearchBar.jsx';

function ClosetItemPage () {

    //use-history
    const history = useHistory();

    const [highlightedButton, setHighlightedButton] = useState('');

    // handles the toggle button. switch page view from category page to outfits.
    const toggleButtonClicked = (e) => {
        switch(e.target.value) {
            case 'category':
                // No need to history.push, you're already here!
                setHighlightedButton('category');
                break;
            case 'outfit':
                history.push('/closet/outfits')
                setHighlightedButton('outfit');
                break;
        }
    }

    return (
        <>
            <div className='outfitForm'>
                <ToggleButton toggleButtonClicked={toggleButtonClicked} highlighted={'category'} />
                <SearchBar />
                <h4>My Closet: Category</h4>
                <CategoryButtons />  
            </div>
            <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
            </Paper>
        </>
    )
}

export default ClosetItemPage;