import Box from '@mui/material/Box'
import './ShippingSelector.css'


export default function ShippingAddress({ address }){

    // const home = {
    //     name: 'Kyle Jensen',
    //     street_address: '5920 Teakwood Lane North',
    //     city: 'Plymouth',
    //     state: 'MN',
    //     zip: '55442'
    // }

    return(
        <Box className='addressDisplay' width={1} lineHeight={.5}>
            
                <p>{address.name}</p>
                <p>{address.street_address}</p>
                <p>{address.city} {address.state}, {address.zip}</p>
           
        </Box>
    )
}