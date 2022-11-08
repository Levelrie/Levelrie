import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// item is a prop passed in from component
// example: item = a specific shirt
function FavoriteButton({itemId, outfitId}) {

  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  // when heart is clicked, set check to the opposite of its value
  const handleChange = () => {
    setCheck(!check);
    handleFavorite();
  }

  const handleFavorite = () => {
    if(check === false) {  // if false (false because check will not have changed yet) then add to favorites
      console.log('dispatch add to favorites');
      dispatch({
        type: 'SAGA_FAVORITE_ITEM',
        payload: {
          itemId: itemId,
          outfitId: outfitId
        }
      });
    }
    else { // if true (true because check will not have changed yet) then remove from favorites
      console.log('dispatch remove from favorites');
      dispatch({
        type: 'SAGA_UNFAVORITE_ITEM',
        payload: {
          itemId: itemId,
          outfitId: outfitId
        }
      });
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

export default FavoriteButton;