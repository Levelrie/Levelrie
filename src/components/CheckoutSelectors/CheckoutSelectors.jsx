import ShippingSelector from '../ShippingSelector/ShippingSelector.jsx'
import ShippingEstimate from '../ShippingSelector/ShippingEstimate.jsx';
import PaymentSelector from '../PaymentSelect/PaymentSelect.jsx'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';
import PayNow from '../PayNow/PayNow.jsx';



export default function CheckoutSelector() {

    return(
        <Stack justifyItems='center' alignItems='center'>
            <ShippingSelector />
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3}} />
            <PaymentSelector />
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3}} />
            <ShippingEstimate />
            <ul>
                <li></li>
            </ul>
            <Divider width='100%' color='#F2DCF2' height={32} sx={{borderBottomWidth: 8, margin: 3}} />
            <PayNow />
        </Stack>
    )
}