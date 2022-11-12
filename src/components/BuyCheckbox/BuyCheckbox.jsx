import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// item is a prop passed in from component
// example: item = a specific shirt
function BuyCheckbox(item) {

  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  // when checkbox is clicked, set check to the opposite of its value
  const handleChange = () => {
    setCheck(!check);
    handleBuy();
  }

  const handleBuy = () => {
    if(check === false) {  // if false (flase because check will not have changed yet) then add to cart
      console.log('dispatch add to cart');
      dispatch({
              type: 'ADD_TO_CART',
              payload: item
          })
    }
    else { // if true (true because check will not have changed yet) then remove from cart
      console.log('dispatch remove from cart');
      dispatch({
              type: 'REMOVE_FROM_CART',
              payload: item
          })
    }
  }

    return (
        <FormControlLabel
          value={check}
          control={<Checkbox onChange={handleChange} sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}/>}
          label="Buy"
          labelPlacement="top"
        />
    );
};

export default BuyCheckbox;