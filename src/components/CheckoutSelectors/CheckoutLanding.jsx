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
            <Stack justifyItems='center' alignItems='center' width={.8} mb={3}>
                <h1 className="estimateText">LEVELRIE</h1>
                <h3 className="estimateText">Shopping Cart</h3>
            </Stack>
            <Stack id="shippingEst" direction='row' width={1} mb={3}>
                <ShippingEstimate />
            </Stack>
            <Stack width={1} className='checkoutFrame' justifyItems='center' alignItems='center' mt={3}>
                <ItemItem />
                <Divider width='80%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, mt: 10, mb: 3}} />
                <PurchaseItems  />
            </Stack>

        </Stack>


    )
}