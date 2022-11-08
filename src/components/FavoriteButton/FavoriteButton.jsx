import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// item is a prop passed in from component
// example: item = a specific shirt
function FavoriteButton(item) {

  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  // when heart is clicked, set check to the opposite of its value
  const handleChange = () => {
    setCheck(!check);
    handleFavorite();
  }

  const handleFavorite = () => {
    if(check === false) {  // if false (flase because check will not have changed yet) then add to favorites
      console.log('dispatch add to favorites');
      // dispatch({
          //     type: 'ADD_TO_FAVORITES',
          //     payload: item
          // })
    }
    else { // if true (true because check will not have changed yet) then remove from favorites
      console.log('dispatch remove from favorites');
      // dispatch({
          //     type: 'REMOVE_FROM_FAVORITES',
          //     payload: item
          // })
    }
  }

    return (
        <Checkbox 
            onChange={handleChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            value={check}
            sx={{
                color: 'black',
                '&.Mui-checked': {
                  color: 'black',
                },
            }}
        />    
    );
};

export default FavoriteButton;