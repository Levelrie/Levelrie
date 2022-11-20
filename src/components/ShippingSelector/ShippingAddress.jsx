import Box from '@mui/material/Box'
import './ShippingSelector.css'
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';







export default function ShippingAddress({ address }){
    const user = useSelector(store => store.user)
    console.log('address in shipping address!!!!!!!!!!!!!!!!!!!!!!!!!', address)

    // const home = {
    //     name: 'Kyle Jensen',
    //     street_address: '5920 Teakwood Lane North',
    //     city: 'Plymouth',
    //     state: 'MN',
    //     zip: '55442'
    // }

    return(

                <FormControlLabel value={address.id} control={<Radio/>}  label={
                    <Box className='addressDisplay' width={1} lineHeight={.25} padding={2}>
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city} {address.state}, {address.zip}</p>
                    </Box>
                
                }/>
 
        
        
        
    )
}

{/*   */}