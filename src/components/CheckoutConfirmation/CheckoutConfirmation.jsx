import './CheckoutConfirmation.css'
import ShippingEstimate from '../ShippingSelector/ShippingEstimate'
import Stack from '@mui/material/Stack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShippingAddress from '../ShippingSelector/ShippingAddress';
import CartItem from '../CheckoutSelectors/CartItems';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


// useEffect(() => {
//     effect
//     return () => {
//         cleanup
//     }
// }, [input])


export default function CheckoutConfirmation(){
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart)
    const user = useSelector(store => store.user)
    var cartTotal = 0
    const shippingTotal = Number(19.99)


    useEffect(() => {
        dispatch({type: 'GET_CART_ITEMS'})
        console.log('How many???')
        // Cleanup function to clear cart. NEEDS TESTING
        // return () => {
        //     dispatch({type: 'CLEAR_CART'})
        // }
    }, []);

    const home = {
        name: 'Kyle Jensen',
        street_address: '5920 Teakwood Lane North',
        city: 'Plymouth',
        state: 'MN',
        zip: '55442'
    }

    return(
        <>
            <Stack spacing={0} justifyContent='center' alignItems='center' id='confirmationFrame'>
                <Stack direction='row' alignItems='center' spacing={1} mt={1}>
                    <CheckCircleIcon fontSize='large' color='logoPink' />
                    <h3 className='checkoutText'>Order Confirmation</h3>
                </Stack>
                <h3 className='checkoutText'>Thank you!</h3>
                <h5 className='checkoutText'>Your order #BE12345 has been placed.</h5>
                <p className='checkoutText'>We sent an email to {user.email} with your order confirmation and bill.</p>
                <p className='checkoutText'>Time placed: {new Date().toLocaleString()} </p>
                <Stack className="checkoutShipping" direction='row' width={1}>
                    <ShippingEstimate />
                </Stack>
                <Stack width={.8}>
                    <h5 className='checkoutText'>  Shipping Address</h5>
                    <ShippingAddress address={home}/>
                </Stack>
                <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, m: 3}}/>

                <Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' marginBottom={0}>
                        <h4>Order Items</h4>
                        <p>{cart.length} Items</p>
                    </Stack>
                    {cart ? cart.map((item) => {
                        console.log('item price', item.price)
                        cartTotal += Number(item.price.substring(1))
                        console.log(cartTotal)
                        return(
                            <Box key={item.id} className='outfitFrame' paddingBottom={10} justifyItems='center' alignItems='center'>
                                <CartItem item={item}  />
                            </Box>
                    )}): ''}
                </Stack>
                <Grid2 container width={.9} marginTop={5} alignItems='left' justifyContent='space-between'>
                    <Grid2 xs={12}>
                        <h5 >Order Summary</h5>
                    </Grid2>
                    <Grid2 xs={10}>
                        <p >Subtotal</p>
                    </Grid2>
                    <Grid2 xs={2}>
                        <p>${cartTotal}</p>
                    </Grid2>
                    <Grid2 xs={10}>
                        <p >Shipping</p>
                    </Grid2>
                    <Grid2 xs={2}>
                        <p>$19.99</p>
                    </Grid2>
                    <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 4, mb: 1}}/>
                    <Grid2 xs={10}>
                        <h5 >Total</h5>
                    </Grid2>
                    <Grid2 xs={2}>
                        <p>${cartTotal + shippingTotal}</p>
                    </Grid2>
                </Grid2>
                <Button variant='outlined' onClick={() => history.push('/home')} sx={{width:.8, mb:11}}>Back to Shopping</Button>
            </Stack>
        </>
    )
}