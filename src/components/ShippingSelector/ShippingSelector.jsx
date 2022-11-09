import './ShippingSelector.css'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Stack from '@mui/material/Stack'



export default function ShippingSelector() {

    const shippingClick = () => {
        console.log('You clicked the shipping selector')
    } 
    return(
        <Stack id="shippingSelector" direction='row' justifyContent='space-between' alignItems='center'><LocalShippingOutlinedIcon/>Choose Address<ArrowForwardIosOutlinedIcon onClick={shippingClick}/></Stack>
    )
}