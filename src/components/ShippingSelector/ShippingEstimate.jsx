import './ShippingSelector.css'
import Stack from '@mui/material/Stack'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useSelector } from 'react-redux'



export default function ShippingEstimate({ itemCount }) {
    const cartCount = useSelector(store => store.cart)
        return(
            <Stack width='100%' justifyContent='space-between' direction='row' margin={3} mt={0} paddingX={1}>
                <LocalShippingOutlinedIcon/>
                <p className='estimateText'>{itemCount} items</p>
                <p id='shippingEstimate' className='estimateText'>Arrives: Nov 21-23</p>
            </Stack>
        )
}