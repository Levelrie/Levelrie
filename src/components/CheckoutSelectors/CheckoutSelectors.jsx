import ShippingSelector from '../ShippingSelector/ShippingSelector.jsx'
import ShippingEstimate from '../ShippingSelector/ShippingEstimate.jsx';
import PaymentSelector from '../PaymentSelect/PaymentSelect.jsx'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';
import PayNow from '../PayNow/PayNow.jsx';
import CartItem from './CartItems.jsx';
import './CheckoutSelector.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



export default function CheckoutSelector() {
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart)
    var cartTotal = 0



    useEffect(() => {
        dispatch({type: 'GET_CART_ITEMS'})
        console.log('How many???');
    }, []);

    console.log('cart???', cart)
    return(


        <Stack justifyItems='center' alignItems='center' width={1}>
            <ShippingSelector />
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3}} />
            <PaymentSelector />
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3, mb: 1}} />
            <Stack direction='row' overflow={'scroll'} >
            {cart ? cart.map((item) => {
                cartTotal += Number(item.price.substring(1))
                return(
                    <CartItem item={item} key={item.id}/>
            )}): 'None'}
            </Stack>
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3}} />
            <PayNow total={cartTotal}/>
        </Stack>
    )
}


