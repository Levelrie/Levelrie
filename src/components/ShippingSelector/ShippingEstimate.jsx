import './ShippingSelector.css'
import Stack from '@mui/material/Stack'


export default function ShippingEstimate() {

        return(
            <Stack width='100%' justifyContent='space-between' direction='row' margin={3} mt={0} paddingX={1}>
                <p className='estimateText'>2 Items</p>
                <p id='shippingEstimate' className='estimateText'>Arrives: Nov 21-23</p>
            </Stack>
        )
}