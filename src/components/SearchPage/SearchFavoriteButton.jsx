import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// item is a prop passed in from component
// example: item = a specific shirt
export default function SearchFavoriteButton({id}) {



    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();

    const constraint = useSelector(store => store.searchResultsReducer.constraint);

    // when heart is clicked, set check to the opposite of its value
    const handleChange = () => {
        setCheck(!check);
        handleFavorite();
    }

  const handleFavorite = () => {
    if(check === false) {  // if false (false because check will not have changed yet) then add to favorites
      console.log('dispatch add to favorites');
        switch (constraint) {
            case 'globalOutfits':
                dispatch({
                    type: 'SAGA_FAVORITE_OUTFIT_FROM_GLOBAL_SEARCH',
                    payload: id
                });
                break;
            case 'globalItems':
                dispatch({
                    type: 'SAGA_FAVORITE_ITEM_FROM_GLOBAL_SEARCH',
                    payload: id
                });
                break;
        }
    }
    else { // if true (true because check will not have changed yet) then remove from favorites
      console.log('dispatch remove from favorites');
      switch (constraint) {
        case 'globalOutfits':
            dispatch({
                type: 'SAGA_UNFAVORITE_OUTFIT_FROM_GLOBAL_SEARCH',
                payload: id
            });
            break;
        case 'globalItems':
            dispatch({
                type: 'SAGA_UNFAVORITE_ITEM_FROM_GLOBAL_SEARCH',
                payload: id
            });
            break;
    }
  }
}

    return (
        <Checkbox 
            onChange={handleChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            value={check}
            sx={{
                color: 'pink',
                '&.Mui-checked': {
                  color: 'pink',
                },
            }}
        />    
    );
};