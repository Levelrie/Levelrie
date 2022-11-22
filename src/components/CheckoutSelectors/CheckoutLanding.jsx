import ShippingEstimate from "../ShippingSelector/ShippingEstimate";
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';
import ItemItem from "../ItemItem/ItemItem.jsx"
import PurchaseItems from "../PurchaseItems/PurchaseItems";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import FavoriteItemItem from "../FavoriteItemList/FavoriteItemItem";




export default function CheckoutLanding() {
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart);
    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);
    console.log('cart in landing', cart[0])
    useEffect(() => {
        dispatch({type: 'GET_CART_ITEMS'})
        console.log('How many???');

        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });

        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });

        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

    }, []);



    return(

        <Stack justifyItems='center' alignItems='center' pb={20}>
            <Stack justifyItems='center' alignItems='center' width={.8} mb={3}>
                <h1 className="estimateText">LEVELRIE</h1>
                <h3 className="estimateText">Shopping Cart</h3>
            </Stack>
            <Stack id="shippingEst" direction='row' width={1} mb={3}>
                <ShippingEstimate itemCount={cart.length}/>
            </Stack>
            <Stack width={1} className='checkoutFrame' justifyItems='center' alignItems='center' mt={3} overflow='scroll'>
                {cart ? cart.map((item) => {
                return(
                    <FavoriteItemItem item={item} key={item.id} category={[item.category]} sizes={[{name: item.name, size: item.size}]} colors={[{name: item.name, color: item.color}]} inItemDetails={true} qtyArray={[1]}/>
                )}): 'None'}
            </Stack>
            <Divider width='80%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, mt: 5, mb: 3}} />
            <PurchaseItems  />

        </Stack>


    )
}