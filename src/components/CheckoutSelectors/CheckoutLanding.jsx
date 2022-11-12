import ShippingEstimate from "../ShippingSelector/ShippingEstimate";
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';
import ItemItem from "../ItemItem/ItemItem.jsx"
import PurchaseItems from "../PurchaseItems/PurchaseItems";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";




export default function CheckoutLanding() {
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart)
    useEffect(() => {
        dispatch({type: 'GET_CART_ITEMS'})
        console.log('How many???');
    }, []);



    return(
        <Stack justifyItems='center' alignItems='center'>
            <Stack justifyItems='center' alignItems='center' width={.8}>
                <h1>LEVELRIE</h1>
                <h3>Shopping Cart</h3>
            </Stack>
            <Stack id="shippingEst" direction='row' width={1} >
                <ShippingEstimate />
            </Stack>
            <Stack width={1} className='checkoutFrame' justifyItems='center' alignItems='center'>
                <ItemItem />
                <Divider width='80%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, mt: 10}} />
                <PurchaseItems  />
            </Stack>
        </Stack>


    )
}