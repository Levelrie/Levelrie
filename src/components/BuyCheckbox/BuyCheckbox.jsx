import { useState } from 'react';
import { useDispatch} from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// item is a prop passed in from component
// example: item = a specific shirt
function BuyCheckbox({ item, carted }) {
  console.log('carted?', carted)
  const [check, setCheck] = useState(carted);
  const dispatch = useDispatch();


    // when checkbox is clicked, set check to the opposite of its value
  const handleChange = () => {
    setCheck(!check);
    handleBuy();
  }

  const handleBuy = () => {
    if(check === false) {  // if false (false because check will not have changed yet) then add to cart
      console.log('dispatch add to cart');
      dispatch({
              type: 'SAGA_ADDCART_ITEM',
              payload: item
          })
    }
    else { // if true (true because check will not have changed yet) then remove from cart
      console.log('dispatch remove from cart');
      dispatch({
              type: 'SAGA_UNCART_ITEM',
              payload: item
          })
    }
  }

    return (
        <FormControlLabel
        value={check}
        control={<Checkbox 
          onChange={handleChange}
          checked={check}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}/>}
          label={check ? 'Del' : 'Buy'}
          labelPlacement="top"
        />
    );
};

export default BuyCheckbox;