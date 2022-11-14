import './ModifyShipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import ShippingAddress from '../ShippingSelector/ShippingAddress';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';





export default function ModifyShipping(){

    const dispatch = useDispatch()
    const addresses = useSelector(store => store.shipping)
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        console.log('value= ', value)
      setValue(event.target.value);
    };

    useEffect(() => {
        dispatch({type: 'GET_SHIPPING'})
        console.log('How many???');
    }, []);

    
 
    // const home = {
    //     name: 'Kyle Jensen',
    //     street_address: '5920 Teakwood Lane North',
    //     city: 'Plymouth',
    //     state: 'MN',
    //     zip: '55442'
    // }
    console.log('addresses in modify', addresses)

    return(
       
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Choose an Address</FormLabel>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                >
                {addresses && addresses.map((address) => {
                    return(
                <ShippingAddress address={address} key={address.id}/>
                
                )})}
                </RadioGroup>
            </FormControl> 
    )
}



// aria-labelledby="demo-controlled-radio-buttons-group"
// name="controlled-radio-buttons-group"
// value={value}
// onChange={handleChange}
// >

        
// })}

// {cart.length && cart.map((item) => {
//     return(
//         <CartItem item={item} key={item.id}/>
// )})}